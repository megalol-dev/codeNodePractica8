import db from "../../../../db/db";
import { getUserFromRequest } from "../../../../lib/auth";

export async function GET(request, { params }) {
    const { proyectoId } = await params;

    return new Promise((resolve) => {
        db.all(
            `
      SELECT 
        resenas.id,
        resenas.nota,
        resenas.comentario,
        resenas.fecha,
        usuarios.username
      FROM resenas
      JOIN usuarios ON resenas.usuario_id = usuarios.id
      WHERE resenas.proyecto_id = ?
      ORDER BY resenas.fecha DESC
      `,
            [proyectoId],
            (error, rows) => {
                if (error) {
                    resolve(
                        Response.json(
                            { error: "Error al obtener reseñas" },
                            { status: 500 }
                        )
                    );
                    return;
                }

                resolve(Response.json(rows));
            }
        );
    });
}

export async function POST(request, { params }) {
    const user = await getUserFromRequest(request);

    if (!user) {
        return Response.json(
            { error: "Debes iniciar sesión para escribir una reseña" },
            { status: 401 }
        );
    }

    const { proyectoId } = await params;
    const data = await request.json();

    const nota = Number(data.nota);
    const comentario = data.comentario?.trim();

    if (!nota || nota < 1 || nota > 10 || !comentario) {
        return Response.json(
            { error: "La nota debe estar entre 1 y 10 y el comentario es obligatorio" },
            { status: 400 }
        );
    }

    return new Promise((resolve) => {
        db.run(
            `
      INSERT INTO resenas (proyecto_id, usuario_id, nota, comentario)
      VALUES (?, ?, ?, ?)
      `,
            [proyectoId, user.id, nota, comentario],
            function (error) {
                if (error) {
                    resolve(
                        Response.json(
                            {
                                error:
                                    "Ya has dejado una reseña para este juego o hubo un error",
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