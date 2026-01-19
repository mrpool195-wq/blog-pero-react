import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Blog from "./Blog.jsx";


function Home(){
    return (
        <div className="container p-2">
            <h2>Pagina de inicio</h2>
        </div>
    );
}

// function Blog(){
//     return (
//         <div className="container p-2">
//             <h2>blog</h2>
//         </div>
//     );
// }

function About(){
    return (
        <div className="container p-2">
            <h2>Pagina sobre nosotros</h2>
        </div>
    );
}

function NavBar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
            <div className="navbar-brand">Blog personal</div>
            <div className="container-fluid">
               <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                    </ul>
               </div>
            </div>
         </nav>
    );
}

export default function App(){
    return(
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
            </Routes>

        </BrowserRouter>
    );
}