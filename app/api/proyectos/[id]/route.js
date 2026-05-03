import db from "../../../../db/db";
import { getUserFromRequest } from "../../../../lib/auth";

export async function GET(request, { params }) {
    const { id } = await params;

    return new Promise((resolve) => {
        db.get("SELECT * FROM proyectos WHERE id = ?", [id], (error, row) => {
            if (error) {
                resolve(
                    Response.json(
                        { error: "Error al obtener el juego" },
                        { status: 500 }
                    )
                );
                return;
            }

            if (!row) {
                resolve(Response.json({ error: "Juego no encontrado" }, { status: 404 }));
                return;
            }

            resolve(Response.json(row));
        });
    });
}

export async function PUT(request, { params }) {
    const user = await getUserFromRequest(request);

    if (!user || user.rol !== "admin") {
        return Response.json(
            { error: "No tienes permiso para editar juegos" },
            { status: 403 }
        );
    }

    const { id } = await params;
    const data = await request.json();

    const { titulo, compania, anio, genero, informacion, nota, conclusion } =
        data;

    return new Promise((resolve) => {
        const sql = `
      UPDATE proyectos
      SET titulo = ?, compania = ?, anio = ?, genero = ?, informacion = ?, nota = ?, conclusion = ?
      WHERE id = ?
    `;

        db.run(
            sql,
            [titulo, compania, anio, genero, informacion, nota, conclusion, id],
            function (error) {
                if (error) {
                    resolve(
                        Response.json(
                            { error: "Error al editar el juego" },
                            { status: 500 }
                        )
                    );
                    return;
                }

                resolve(Response.json({ success: true }));
            }
        );
    });
}

export async function DELETE(request, { params }) {
    const user = await getUserFromRequest(request);

    if (!user || user.rol !== "admin") {
        return Response.json(
            { error: "No tienes permiso para borrar juegos" },
            { status: 403 }
        );
    }

    const { id } = await params;

    return new Promise((resolve) => {
        db.run("DELETE FROM proyectos WHERE id = ?", [id], function (error) {
            if (error) {
                resolve(
                    Response.json(
                        { error: "Error al borrar el juego" },
                        { status: 500 }
                    )
                );
                return;
            }

            resolve(Response.json({ success: true }));
        });
    });
}