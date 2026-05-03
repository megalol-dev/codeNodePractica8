"use client";

import { use, useEffect, useState } from "react";

type EditarProyectoProps = {
    params: Promise<{ id: string }>;
};

export default function EditarProyecto({ params }: EditarProyectoProps) {
    const { id } = use(params);

    const [form, setForm] = useState({
        titulo: "",
        compania: "",
        anio: "",
        genero: "",
        informacion: "",
        nota: "",
        conclusion: "",
    });

    useEffect(() => {
        const rol = localStorage.getItem("rol");
        const token = localStorage.getItem("token");

        if (rol !== "admin" || !token) {
            window.location.href = "/login";
            return;
        }

        fetch(`/api/proyectos/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setForm({
                    titulo: data.titulo || "",
                    compania: data.compania || "",
                    anio: String(data.anio || ""),
                    genero: data.genero || "",
                    informacion: data.informacion || "",
                    nota: String(data.nota || ""),
                    conclusion: data.conclusion || "",
                });
            });
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const res = await fetch(`/api/proyectos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...form,
                anio: Number(form.anio),
                nota: Number(form.nota),
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Juego editado correctamente");
            window.location.href = "/proyectos/admin";
        } else {
            alert(data.error || "Error al editar");
        }
    };

    return (
        <main className="min-h-screen bg-[#050814] text-white px-8 py-10">
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-bold text-[#00d9ff] mb-6">
                    Editar videojuego
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 bg-[#08111f] p-6 rounded-xl border border-[#00d9ff]/30"
                >
                    <input name="titulo" value={form.titulo} onChange={handleChange} className="input" required />
                    <input name="compania" value={form.compania} onChange={handleChange} className="input" required />
                    <input name="anio" value={form.anio} onChange={handleChange} className="input" />
                    <input name="genero" value={form.genero} onChange={handleChange} className="input" />
                    <textarea name="informacion" value={form.informacion} onChange={handleChange} className="input" />
                    <input name="nota" value={form.nota} onChange={handleChange} className="input" />
                    <textarea name="conclusion" value={form.conclusion} onChange={handleChange} className="input" />

                    <button className="bg-[#00d9ff] text-black font-bold py-2 rounded hover:bg-[#00b8d4]">
                        Guardar cambios
                    </button>
                </form>
            </div>
        </main>
    );
}