import './LoginScreen.css'
// import React from 'react'

const LoginScreen = () => {
    return(
        <div>
            <main>
                <section className="login-section">
                    <div className="login-form-box">
                        <form className="login-form" action="submit" method="POST">
                            <h1>Sistema Roommates</h1>
                            
                            <div className="username-input">
                                <label htmlFor="username">Usuário: </label>
                                <input type="text" id="username" name="username" required/>
                            </div>

                            <div className="password-input">
                                <label htmlFor="username">Senha: </label>
                                <input type="password" id="username" name="username" required/>
                            </div>

                            <button className="submit-button">Enviar</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default LoginScreen
