import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
      {/* CTA Section */}
      <section className={styles.ctaContainer}>
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready To Disrupt Ride-Sharing Status Quo?</h2>
            <p className={styles.ctaSubtitle}>
              Be an early adopter and earn rewards while helping to make ride-sharing more fairer for everyone.
            </p>
            <button className={styles.ctaBtn}>Join Our Waitlist</button>
          </div>
        </div>
      </section>


      {/* Two Color Divider */}
      <div className={styles.footerDividerTop}>
        <div className={styles.dividerContainer}>
          <div className={styles.dividerTeal}></div>
          <div className={styles.dividerBlue}></div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className={styles.mainFooter}>
        <div className={styles.footerContent}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <img
                src="https://pikup.us/wp-content/uploads/2025/11/purple_svg.svg"
                alt="PikUP"
                className={styles.footerLogo}
              />
              <div className={styles.brandDivider}></div>
              <p className={styles.brandSlogan}>Save Max. Earn Max.</p>
            </div>

            <div className={styles.footerNav}>
              <ul className={styles.navLinks}>
                <li><a href="https://pikup.us/">Home</a></li>
                <li><a href="https://pikup.us/about-us/">About Us</a></li>
                <li><a href="https://pikup.us/services/">Services</a></li>
                <li><a href="https://pikup.us/blog/">Blog</a></li>
                <li><a href="https://pikup.us/contact-us/">Contact Us</a></li>
              </ul>
              <div className={styles.socialIcons}>
                {/* Facebook */}
                <a href="https://www.facebook.com/profile.php?id=61583870717780" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M27.867 2.66675H4.13366C3.74467 2.66675 3.37162 2.82127 3.09657 3.09632C2.82152 3.37138 2.66699 3.74443 2.66699 4.13341V27.8667C2.66699 28.2557 2.82152 28.6288 3.09657 28.9038C3.37162 29.1789 3.74467 29.3334 4.13366 29.3334H16.907V19.0001H13.4403V15.0001H16.907V12.0001C16.8352 11.2958 16.9183 10.5842 17.1506 9.91546C17.3829 9.24668 17.7587 8.63681 18.2516 8.12863C18.7445 7.62045 19.3427 7.22627 20.0041 6.97373C20.6655 6.72119 21.3741 6.61642 22.0803 6.66675C23.1181 6.65958 24.1554 6.71301 25.187 6.82675V10.4267H23.067C21.387 10.4267 21.067 11.2267 21.067 12.3867V14.9601H25.067L24.547 18.9601H21.067V29.3334H27.867C28.0596 29.3334 28.2503 29.2955 28.4283 29.2218C28.6062 29.1481 28.7679 29.04 28.9041 28.9038C29.0403 28.7676 29.1483 28.606 29.222 28.428C29.2957 28.2501 29.3337 28.0594 29.3337 27.8667V4.13341C29.3337 3.94081 29.2957 3.75009 29.222 3.57215C29.1483 3.3942 29.0403 3.23252 28.9041 3.09632C28.7679 2.96013 28.6062 2.8521 28.4283 2.77839C28.2503 2.70468 28.0596 2.66675 27.867 2.66675Z" fill="#08D9C4" />
                  </svg>
                </a>

                {/* Instagram (Colorful) */}
                <a href="https://www.instagram.com/pikupinc/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_5_16341_custom)" />
                    <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_5_16341_custom)" />
                    <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_5_16341_custom)" />
                    <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white" />
                    <defs>
                      <radialGradient id="paint0_radial_5_16341_custom" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
                        <stop stopColor="#B13589" />
                        <stop offset="0.79309" stopColor="#C62F94" />
                        <stop offset="1" stopColor="#8A3AC8" />
                      </radialGradient>
                      <radialGradient id="paint1_radial_5_16341_custom" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                        <stop stopColor="#E0E8B7" />
                        <stop offset="0.444662" stopColor="#FB8A2E" />
                        <stop offset="0.71474" stopColor="#E2425C" />
                        <stop offset="1" stopColor="#E2425C" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="paint2_radial_5_16341_custom" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
                        <stop offset="0.156701" stopColor="#406ADC" />
                        <stop offset="0.467799" stopColor="#6A45BE" />
                        <stop offset="1" stopColor="#6A45BE" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </a>

                {/* X / Twitter */}
                <a href="https://x.com/pikup26698" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.66634 1.33325C5.25185 1.33325 3.8953 1.89516 2.89511 2.89535C1.89491 3.89554 1.33301 5.2521 1.33301 6.66659V25.3333C1.33301 26.7477 1.89491 28.1043 2.89511 29.1045C3.8953 30.1047 5.25185 30.6666 6.66634 30.6666H25.333C26.7475 30.6666 28.104 30.1047 29.1042 29.1045C30.1044 28.1043 30.6663 26.7477 30.6663 25.3333V6.66659C30.6663 5.2521 30.1044 3.89554 29.1042 2.89535C28.104 1.89516 26.7475 1.33325 25.333 1.33325H6.66634ZM6.22101 5.99992C6.07505 6.05416 5.94378 6.14174 5.83764 6.25568C5.73151 6.36961 5.65345 6.50676 5.60968 6.6562C5.56591 6.80563 5.55764 6.96322 5.58554 7.11641C5.61343 7.26961 5.67671 7.41417 5.77034 7.53859L13.2557 17.4719L5.36901 25.9319L5.31034 25.9999H8.03967L14.4797 19.0946L19.429 25.6653C19.5438 25.8173 19.6997 25.9335 19.8783 25.9999H25.7743C25.9201 25.9454 26.0511 25.8576 26.1569 25.7435C26.2628 25.6295 26.3405 25.4923 26.384 25.3429C26.4275 25.1935 26.4356 25.036 26.4075 24.8829C26.3794 24.7299 26.316 24.5855 26.2223 24.4613L18.737 14.5279L26.689 5.99992H23.9557L17.5157 12.9066L12.5637 6.33592C12.449 6.18333 12.2931 6.06675 12.1143 5.99992H6.22101ZM20.7277 24.0639L8.57434 7.93592H11.2663L23.4183 24.0626L20.7277 24.0639Z" fill="#08D9C4" />
                  </svg>
                </a>

                {/* Youtube */}
                <a href="https://www.youtube.com/@PikUPInc-2025" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="22" viewBox="0 0 27 22" fill="none">
                    <path d="M13.6587 0C14.3707 0.004 16.152 0.0213333 18.0453 0.0973333L18.7173 0.126666C20.6227 0.216 22.5267 0.370667 23.472 0.633333C24.732 0.988 25.7213 2.02 26.056 3.32933C26.5893 5.40933 26.656 9.46533 26.664 10.448L26.6653 10.6507V10.8827C26.656 11.8653 26.5893 15.9227 26.056 18.0013C25.7173 19.3147 24.7267 20.348 23.472 20.6973C22.5267 20.96 20.6227 21.1147 18.7173 21.204L18.0453 21.2347C16.152 21.3093 14.3707 21.328 13.6587 21.3307L13.3453 21.332H13.0053C11.4987 21.3227 5.19733 21.2547 3.192 20.6973C1.93333 20.3427 0.942667 19.3107 0.608 18.0013C0.0746668 15.9213 0.008 11.8653 0 10.8827V10.448C0.008 9.46533 0.0746668 5.408 0.608 3.32933C0.946667 2.016 1.93733 0.982666 3.19333 0.634666C5.19733 0.0759998 11.5 0.008 13.0067 0H13.6587ZM10.6653 6V15.3333L18.6653 10.6667L10.6653 6Z" fill="#08D9C4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footerDivider}></div>

          <div className={styles.footerBottom}>
            <p className={styles.copyrightText}>Copyright PikUP 2025. All Rights Reserved.</p>
            <div className={styles.legalLinks}>
              <a href="https://pikup.us/terms-of-service/">Terms of Service</a>
              <span className={styles.legalDivider}>|</span>
              <a href="https://pikup.us/privacy-policy/">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
