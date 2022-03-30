import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import logo from "../../assets/henry.png";

const Landing = () => {
  return (
    <div className="landing">
      <header className="header">
        <nav>
          <div className="navContainer">
            <ul>
              <li>Pokemón </li>
              <img src={logo} alt=""></img>
            </ul>
            <ul>
              <Link className="home" to="/home">
                <li>Home</li>
              </Link>
            </ul>
            <ul>
              <div className="repositorio">
                <label>Veronica Atariguana</label>
                <a
                  className="repoA"
                  target="_blank"
                  href="https://github.com/vatariguana/PI_POKEMON"
                  rel="noreferrer"
                >
                  Repository GitHub
                </a>
              </div>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Landing;
