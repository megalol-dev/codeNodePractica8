import db from "../../../db/db";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(request) {
    const data = await request.json();
    const { username, password } = data;

    return new Promise((resolve) => {
        db.get(
            "SELECT * FROM usuarios WHERE username = ?",
            [username],
            async (error, user) => {
                if (error) {
                    resolve(Response.json({ error: "Error servidor" }, { status: 500 }));
                    return;
                }

                if (!user) {
                    resolve(
                        Response.json(
                            { success: false, error: "Usuario no encontrado" },
                            { status: 401 }
                        )
                    );
                    return;
                }

                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    resolve(
                        Response.json(
                            { success: false, error: "Contraseña incorrecta" },
                            { status: 401 }
                        )
                    );
                    return;
                }

                const token = crypto.randomUUID();

                db.run(
                    "INSERT INTO sesiones (token, usuario_id) VALUES (?, ?)",
                    [token, user.id],
                    (sessionError) => {
                        if (sessionError) {
                            resolve(
                                Response.json(
                                    { error: "Error creando sesión" },
                                    { status: 500 }
                                )
                            );
                            return;
                        }

                        resolve(
                            Response.json({
                                success: true,
                                userId: user.id,
                                user: user.username,
                                rol: user.rol,
                                token,
                            })
                        );
                    }
                );
            }
        );
    });
}