import preloader from './../../../accets/imeges/preloader.svg'

type PreloaderPropsType = {}

let Preloader: React.FC <PreloaderPropsType> = (props) => {
    return (
        <img alt='preloader' src={preloader} />
    )
}

export default Preloader