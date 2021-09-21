import preloader from './../../../accets/imeges/preloader.svg'
import style from './../Preloader/Preloader.module.css'

type PreloaderPropsType = {}

let Preloader: React.FC <PreloaderPropsType> = (props) => {
    return (
        <img className={style.preloader} alt='preloader' src={preloader} />
    )
}

export default Preloader