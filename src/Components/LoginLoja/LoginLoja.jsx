import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiLojaLogin } from "../Services/apiLoja.jsx"
import './CSS/styles.css'






function LoginLoja() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [temErro, setTemErro] = useState(false)
    


    function handleLoginLoja() {
        ApiLojaLogin({ email, senha }).then(
            (response) => {
                const dados = [...response.data]
                if (dados) {
                    localStorage.setItem("token", dados[0])
                    localStorage.setItem('loja_id', dados[1])
                    window.location.reload()
                }
            }
            ).catch(
                (error) => {
                    console.log(error)
                    if (error.response.status == 401) {
                        setTemErro(true)
                    }
                }
            )
    }

    const navigatePerfilLoja = useNavigate("/perfil-loja") 
    return (
        <>
            <div className="vh-100 position-relative">
                <div className="login d-flex">
                    <div className="d-flex col-5 bg-light justify-content-center flex-column cardLogCad m-auto ">

                        <div className="d-flex justify-content-center align-content-center position-relative">
                            <h1 className="font title link-secondary mt-5">Login Loja</h1>

                        </div>
                        <div className="d-flex justify-content-center">
                            <form className="d-flex  flex-column mt-4 mb-2 col-8">
                                <label htmlFor="email" className="font mb-2">Email:</label>
                                <input type="email" name="email" id="authEmail" className="input-quest focus-0 col-12 text-black mb-4" value={email} onChange={e => {
                                    setEmail(e.target.value)
                                    if (temErro) setTemErro(true)
                                }} />
                                <label htmlFor="password" className="font mb-2">Senha:</label>
                                <input type="password" name="password" id="authPassword" className="input-quest focus-0 mb-2 text-black" value={senha} onChange={e => setSenha(e.target.value)} />
                                <div className="ocult" id="erroLogin">
                                    <div className="d-flex justify-content-center align-content-center">

                                        {
                                            temErro && (<>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle m-1 text-danger" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                                <p className="p-0 text-danger">Usuário ou senha incorreta</p>
                                            </>

                                            )
                                        }
                                    </div>
                                </div>
                                <a href="#" className="link-secondary text-center fw-bolder mt-2">Esqueceu sua senha?</a>
                            </form>
                        </div>
                        <div className="d-flex col-12 justify-content-center mt-4">
                            <button className="font btn btn-danger col-6 register" onClick={()=>{
                                handleLoginLoja()
                                navigatePerfilLoja('/perfil-loja')}} 
                                id="login">Continuar</button>
                        </div>
                        <p className="link-secondary text-center mt-2 mb-4">
                            Não tem uma conta?
                            <Link className="LinkCadastro text-danger cursor" to="/cadastro-loja">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default LoginLoja