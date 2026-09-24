/**
 * Cloudflare Pages Function: /api/auth
 * Gestão de Autenticação Segura & Nuvem KV para Monte Cristo Bebidas
 * 
 * Regras Estritas:
 * - Apenas 3 usuários permitidos: 'admin', 'ivan', 'michele'.
 * - 'ivan' e 'michele' só podem cadastrar senha com seus tokens secretos exclusivos.
 * - Sincronização automática entre celulares e computadores via Cloudflare KV.
 */

const ALLOWED_USERS = {
    admin: {
        id: 'admin',
        name: 'Administrador (Master)',
        role: 'master',
        activationToken: 'MC-ADMIN-MASTER-2026',
        // Hash padrão inicial para admin ('MonteCristo@2026')
        defaultHash: '1f5c58f75b198649f4a5fdeb36c34a08d16990189fbbd1ce6569de9c8e233256'
    },
    ivan: {
        id: 'ivan',
        name: 'Ivan (Comercial)',
        role: 'operator',
        activationToken: 'MC-IVAN-2026'
    },
    michele: {
        id: 'michele',
        name: 'Michele (Comercial)',
        role: 'operator',
        activationToken: 'MC-MICHELE-2026'
    }
};

const HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate'
};

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: HEADERS
    });
}

export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const userId = (url.searchParams.get('user') || '').toLowerCase().trim();
    const token = (url.searchParams.get('token') || '').trim();

    if (!userId) {
        // Retorna a lista de usuários autorizados para o seletor de login (sem expor tokens nem hashes)
        const publicUsers = Object.values(ALLOWED_USERS).map(u => ({
            id: u.id,
            name: u.name,
            role: u.role
        }));
        return jsonResponse({ users: publicUsers });
    }

    const userConfig = ALLOWED_USERS[userId];
    if (!userConfig) {
        return jsonResponse({ error: 'Usuário não autorizado no sistema.' }, 403);
    }

    const kv = context.env.MONTECRISTO_AUTH;
    let storedData = null;
    if (kv) {
        const raw = await kv.get(`user:${userId}`);
        if (raw) {
            try { storedData = JSON.parse(raw); } catch (e) {}
        }
    }

    const hasPassword = !!(storedData && storedData.passwordHash) || (userId === 'admin' && !!userConfig.defaultHash);
    const isTokenValid = token ? (token === userConfig.activationToken) : false;

    return jsonResponse({
        user: userId,
        name: userConfig.name,
        hasPassword,
        isTokenValid
    });
}

export async function onRequestPost(context) {
    let body;
    try {
        body = await context.request.json();
    } catch (e) {
        return jsonResponse({ error: 'Corpo da requisição inválido.' }, 400);
    }

    const action = body.action; // 'login' | 'setup' | 'change'
    const userId = (body.user || '').toLowerCase().trim();
    const userConfig = ALLOWED_USERS[userId];

    if (!userConfig) {
        return jsonResponse({ error: 'Acesso negado. Usuário não autorizado.' }, 403);
    }

    const kv = context.env.MONTECRISTO_AUTH;

    // 1. SETUP: Criar senha pela primeira vez com Token de Ativação
    if (action === 'setup') {
        const token = (body.token || '').trim();
        const passwordHash = (body.passwordHash || '').trim();

        if (!token || token !== userConfig.activationToken) {
            return jsonResponse({ error: 'Chave de ativação inválida ou não autorizada para este usuário.' }, 403);
        }

        if (!passwordHash || passwordHash.length < 16) {
            return jsonResponse({ error: 'Hash de senha inválido.' }, 400);
        }

        if (kv) {
            await kv.put(`user:${userId}`, JSON.stringify({
                passwordHash,
                updatedAt: new Date().toISOString(),
                activatedWithToken: true
            }));
        }

        return jsonResponse({
            success: true,
            message: `Senha de ${userConfig.name} cadastrada com sucesso!`,
            user: userId,
            name: userConfig.name
        });
    }

    // 2. LOGIN: Autenticar usuário existente
    if (action === 'login') {
        const passwordHash = (body.passwordHash || '').trim();
        if (!passwordHash) {
            return jsonResponse({ error: 'Senha não informada.' }, 400);
        }

        let savedHash = null;
        if (kv) {
            const raw = await kv.get(`user:${userId}`);
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    savedHash = parsed.passwordHash;
                } catch (e) {}
            }
        }

        // Fallback para admin inicial caso ainda não tenha sido alterado no KV
        if (!savedHash && userId === 'admin') {
            savedHash = userConfig.defaultHash;
        }

        if (!savedHash) {
            return jsonResponse({
                error: `O usuário ${userConfig.name} ainda não possui senha cadastrada. Solicite o link de ativação com o Administrador.`,
                requiresSetup: true
            }, 400);
        }

        if (passwordHash === savedHash) {
            return jsonResponse({
                success: true,
                user: userId,
                name: userConfig.name,
                role: userConfig.role
            });
        } else {
            return jsonResponse({ error: 'Senha incorreta. Tente novamente.' }, 401);
        }
    }

    // 3. CHANGE: Alterar senha existente
    if (action === 'change') {
        const currentHash = (body.currentPasswordHash || '').trim();
        const newHash = (body.newPasswordHash || '').trim();

        if (!newHash || newHash.length < 16) {
            return jsonResponse({ error: 'Nova senha inválida.' }, 400);
        }

        let savedHash = null;
        if (kv) {
            const raw = await kv.get(`user:${userId}`);
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    savedHash = parsed.passwordHash;
                } catch (e) {}
            }
        }
        if (!savedHash && userId === 'admin') {
            savedHash = userConfig.defaultHash;
        }

        if (currentHash !== savedHash) {
            return jsonResponse({ error: 'A senha atual informada está incorreta.' }, 401);
        }

        if (kv) {
            await kv.put(`user:${userId}`, JSON.stringify({
                passwordHash: newHash,
                updatedAt: new Date().toISOString()
            }));
        }

        return jsonResponse({
            success: true,
            message: 'Senha alterada com sucesso na nuvem Monte Cristo!'
        });
    }

    return jsonResponse({ error: 'Ação desconhecida.' }, 400);
}
