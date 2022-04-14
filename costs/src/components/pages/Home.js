import styles from './Home.module.css'
import savings from '../../img/savings.svg'

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>Bem-Vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar o seus projetos agora mesmo!</p>
            <a href="/">Criar Projetos</a>
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home