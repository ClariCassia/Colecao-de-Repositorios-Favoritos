import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Main  from '../pages/Main/index'
import Repositorio  from '../pages/Repositorio'


export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Main/>}></Route>
                <Route exact path='/repositorio/:repositorio' element={<Repositorio/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}