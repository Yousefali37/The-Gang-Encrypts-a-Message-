import './Home.css';
import Cards from './../../Components/Cards/Cards';
import DataArray from '../../Data/Data.json';

//Material Ui Icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AboutProject from './../../Components/About Project/AboutProject';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Sidebar from './../../Components/Side-Bar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';


function Home() {

    const location = useLocation();

    const isHome = location.pathname === "/";


    const iconMapping = {
        VpnKeyOutlinedIcon,
        FingerprintOutlinedIcon,
        SortOutlinedIcon,
        WindowOutlinedIcon // Add this icon to the mapping
    };

    return (
        <div className='d-flex'>

            <Sidebar />

            {
                isHome ? (
                    <div className="home container container-fluid flex-grow-1">
                        <div className="home__icon-wrapper">
                            <LockOutlinedIcon className="home__icon" />
                        </div>
                        <div className="home__intro">
                            <h1 className="home__heading">Text Encryption Explorer</h1>
                            <p className="home__description">
                                Discover and explore classical encryption algorithms through this interactive educational tool. Learn how different ciphers protect information.
                            </p>
                        </div>
                        <AboutProject />
                        <div className="home__cards-wrapper row gap-3 justify-content-center align-items-center">

                            {
                                DataArray.map((e) => {

                                    const IconComponent = iconMapping[e.icon];

                                    return (
                                        <div className='col-lg-5 col-sm-12' key={e.id}>
                                            <Cards
                                                title={e.title}
                                                Icon={IconComponent}
                                                Color={e.Color}
                                                desc={e.desc}
                                                link={e.link}
                                                btn={e.btn}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )
            }
        </div>
    );
}

export default Home;
