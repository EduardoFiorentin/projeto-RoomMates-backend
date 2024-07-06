import './Expenses.css'

const Expenses = () => {
    return(
        <div className="container">
            <header>
                <h1>Profile *</h1>
            </header>


            <main className="user-area">
                <section className="actions">
                    <h1 className="title">Área do usuário</h1>
                    <p className="description">Aqui você pode consultar as despesas atreladas ao seu usuário, dentre outras ações</p>

                    <button className="check-expenses-button">
                        <a href="http://localhost:5173/login">Ver despesas</a>
                    </button>
                    <button className="button-02">Opção 2</button>
                    <button className="button-03">Opção 3</button>
                </section>
            </main>
        </div>
    )
}

export default Expenses
