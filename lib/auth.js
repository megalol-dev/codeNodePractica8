import db from "../db/db";

export function getUserFromRequest(request) {
    const auth = request.headers.get("authorization");

    if (!auth || !auth.startsWith("Bearer ")) {
        return Promise.resolve(null);
    }

    const token = auth.replace("Bearer ", "");

    return new Promise((resolve) => {
        db.get(
            `
      SELECT usuarios.id, usuarios.username, usuarios.rol
      FROM sesiones
      JOIN usuarios ON sesiones.usuario_id = usuarios.id
      WHERE sesiones.token = ?
      `,
            [token],
            (error, user) => {
                if (error || !user) {
                    resolve(null);
                    return;
                }

                resolve(user);
            }
        );
    });
}