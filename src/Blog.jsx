import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Blog(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);




    const obtenerPosts = async (url) => {
        try {
            const endpoint = url || `http://localhost:8000/api/blog/posts?page=1`;
            const response = await axios.get(endpoint);
            setPosts(response.data.posts.data);
            setPagination({
                currentPage: response.data.posts.current_page,
                lastPage: response.data.posts.last_page,
                totalPages: response.data.posts.last_page,
                nextPageUrl: response.data.posts.next_page_url,
                prevPageUrl: response.data.posts.prev_page_url,
            })

            console.log(response.data.posts.data);
        }catch (error){
            setError(error.message)
        }finally{
            setLoading(false);
        }
    };


    useEffect(() => {
        obtenerPosts();
    }, []);

    const formatearFecha = (fecha) =>{
        const date = new Date(fecha);
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }



    return (
        <>
            <div className="container p-2">
                <h1 className="text-center pt-4">Blog</h1>
                <h3 className="text-center">Articulos recientemente publicados</h3>
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
                <div>
                    {posts.map((post) => (
                        <div key={post.id} className="row mt-4 border p-2 rounded shadow-sm">
                            <p>{formatearFecha(post.fecha_publicacion)}</p>
                            <p>Publicado por: {post.usuario.nombre} {post.usuario.apellido_paterno} {post.usuario.apellido_materno}</p>
                            <h2 className="titulo">{post.titulo}</h2>
                            <h5 className="text-danger">{post.categoria.nombre}</h5>
                            <h3>{post.subtitulo}</h3>
                            <p>{post.contenido}</p>
                            <div className="align-center justify-content-center mx-auto" style={{maxWidth: '1100px'}}>
                                <img src={post.imagen_url} alt="" className="w-100"/>
                            </div>
                            {post.etiquetas.map((etiqueta)=>(<span key={etiqueta.id} className="mt-2 d-inline-block bg-secondary text-white rounded px-2 py-1 w-25" style={{'--bs-bg-opacity': .5}}>{etiqueta.nombre}</span>))}
                        </div>
                    ))}
  
                </div>



                <div className="contenedor-paginacion mt-4">
                    <div className="d-flex gap-2 mt-3">
                        <button
                            className="btn btn-secondary"
                            disabled={!pagination?.prevPageUrl}
                            onClick={() => obtenerPosts(pagination?.prevPageUrl)}
                        >
                            Anterior
                        </button>

                        <span className="align-self-center">
                            Página {pagination?.currentPage} de {pagination?.lastPage}
                        </span>

                        <button
                            className="btn btn-secondary"
                            disabled={!pagination?.nextPageUrl}
                            onClick={() => obtenerPosts(pagination?.nextPageUrl)}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>

            </div>
        </>
    );

}

