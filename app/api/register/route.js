import db from "../../../db/db";
import bcrypt from "bcrypt";

export async function POST(request) {
    const data = await request.json();

    const username = data.username?.trim();
    const password = data.password?.trim();

    const regexUsuario = /^[A-Za-z0-9]{3,20}$/;
    const regexPassword = /^[A-Za-z0-9]{6,30}$/;

    if (!username || !password) {
        return Response.json(
            { success: false, error: "Usuario y contraseña son obligatorios" },
            { status: 400 }
        );
    }

    if (!regexUsuario.test(username)) {
        return Response.json(
            {
                success: false,
                error:
                    "El usuario debe tener entre 3 y 20 caracteres y solo puede contener letras y números.",
            },
            { status: 400 }
        );
    }

    if (!regexPassword.test(password)) {
        return Response.json(
            {
                success: false,
                error:
                    "La contraseña debe tener entre 6 y 30 caracteres y solo puede contener letras y números.",
            },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve) => {
        db.run(
            "INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)",
            [username, hashedPassword, "user"],
            function (error) {
                if (error) {
                    resolve(
                        Response.json(
                            {
                                success: false,
                                error: "Ese usuario ya existe o hubo un error al registrarlo.",
                            },
                            { status: 400 }
                        )
                    );
                    return;
                }

                resolve(
                    Response.json({
                        success: true,
                        id: this.lastID,
                    })
                );
            }
        );
    });
}