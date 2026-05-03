import db from "../../../db/db";
import { getUserFromRequest } from "../../../lib/auth";

export async function GET() {
    return new Promise((resolve) => {
        db.all("SELECT * FROM proyectos", [], (error, rows) => {
            if (error) {
                resolve(
                    Response.json(
                        { error: "Error al obtener los proyectos" },
                        { status: 500 }
                    )
                );
                return;
            }

            resolve(Response.json(rows));
        });
    });
}

export async function POST(request) {
    const user = await getUserFromRequest(request);

    if (!user || user.rol !== "admin") {
        return Response.json(
            { error: "No tienes permiso para crear juegos" },
            { status: 403 }
        );
    }

    const data = await request.json();

    const { titulo, compania, anio, genero, informacion, nota, conclusion } =
        data;

    if (!titulo || !compania) {
        return Response.json(
            { error: "El título y la compañía son obligatorios" },
            { status: 400 }
        );
    }

    return new Promise((resolve) => {
        const sql = `
      INSERT INTO proyectos 
      (titulo, compania, anio, genero, informacion, nota, conclusion)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

        db.run(
            sql,
            [titulo, compania, anio, genero, informacion, nota, conclusion],
            function (error) {
                if (error) {
                    resolve(
                        Response.json(
                            { error: "Error al guardar el proyecto" },
                            { status: 500 }
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