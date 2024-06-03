import foodcourt from '../images/foodcourt.svg';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div>
            <div className="column ml-5 mr-5 has-text-centered">
                <div className="food-court-title">Food Court</div>
                <img className="mb-5 mt-3" src={foodcourt} alt="Food Court Logo" width={"600px"} />
                <div className="wrapper">
                    <div className="typing mt-5 mb-3">
                        Wir freuen uns auf ihren Besuch!
                    </div>
                </div>
                <Link to="#" className="button-tagesangebote mt-5">Tagesangebote</Link>
            </div>

        </div >
    )
}

export default Home