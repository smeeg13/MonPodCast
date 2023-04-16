import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__left}>
        <ul>
          <li>
            <a href="#">Les émissions</a>
          </li>
          <li>
            <a href="#">Replay</a>
          </li>
          <li>
            <a href="#">Météo</a>
          </li>
          <li>
            <a href="#">Horoscope</a>
          </li>
          <li>
            <a href="#">Services publicitaires</a>
          </li>
          <li>
            <a href="#">L'équipe</a>
          </li>
          <li>
            <a href="#">Postes vacants</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <h4>Contact rapide</h4>
        <p>Radio Rhône SA Ch.</p>
        <p> St-Hubert 5 1950 Sion</p>
        <p>Tél. 027 / 327 20 20</p>
        <p>Fax. 027 / 327 20 23</p>
        <p>
          <a href="mailto:rhonefm@rhonefm.ch">Mail</a>
        </p>
      </div>
      <div className={styles.footer__bottom}>
        <p>© Copyright 2020 Rhône FM</p>
      </div>
    </footer>
  );
};

export default Footer;
