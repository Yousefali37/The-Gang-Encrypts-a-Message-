import './AboutProject.css';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

function AboutProject() {
    return (
        <div className="about">
            <div className="about__header">
                <ShieldOutlinedIcon className="about__icon" />
                <p className="about__title">About This Project</p>
            </div>
            <p className="about__paragraph">
                This university project demonstrates various classical encryption techniques that have been fundamental to the development of modern cryptography. Each algorithm showcases different mathematical approaches to securing information.
            </p>
            <p className="about__paragraph">
                Use the sidebar to navigate between different ciphers. Each page provides an interactive encryption tool and a brief explanation of how the algorithm works.
            </p>
        </div>
    );
}

export default AboutProject;