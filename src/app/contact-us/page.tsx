import ContactForm from "./ContactFormClient";
import Image from "next/image";
import styles from "./contact-us.module.css";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";

export const metadata = {
  title: "Contact Us - AYRO",
  description: "We would love to hear from you. Whether you have questions, need assistance, or want to discuss your business needs, our team is here to help.",
  openGraph: {
    title: "Contact Us - AYRO",
    description: "We would love to hear from you. Whether you have questions, need assistance, or want to discuss your business needs, our team is here to help.",
    url: "https://ayrorides.com/contact-us/",
    images: [
      {
        url: "/assets/OG.png",
        width: 1200,
        height: 630,
        alt: "Contact AYRO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Ayro",
    description: "Questions? Need assistance? Our team is here to help.",
  },
};

export default function Contact() {
  return (
    <main>
      <section className={styles.headerSection}>
        <h1 className={styles.headerTitle}>
          Contact <span className={styles.blueText}>Us</span>
        </h1>
      </section>
      <div className={styles.sectionDivider}>
        <div className={styles.dividerContainer}>
          <div className={styles.dividerTeal}></div>
          <div className={styles.dividerBlue}></div>
        </div>
      </div>

      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Get in Touch with <span>AYRO</span></h2>
            <p className={styles.formSubtitle}>
              We would love to hear from you. Whether you have questions, need assistance, or
              want to discuss your business needs, our team is here to help.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoTextSide}>
            <h3 className={styles.infoTitle}>Contact <span className={styles.tealText}>Information</span></h3>
            <p className={styles.infoDesc}>
              AYRO is building a fair and transparent rideshare system that protects both riders and drivers.
              No surge pricing, no surprises. Our referral program rewards Early Adopters for building
              a community where riders pay less and drivers earn what they deserve.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.infoItemHeader}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M15.0157 29.512C15.0157 29.512 5.33301 21.3573 5.33301 13.3333C5.33301 10.5043 6.45681 7.79121 8.4572 5.79082C10.4576 3.79043 13.1707 2.66663 15.9997 2.66663C18.8287 2.66663 21.5418 3.79043 23.5421 5.79082C25.5425 7.79121 26.6663 10.5043 26.6663 13.3333C26.6663 21.3573 16.9837 29.512 16.9837 29.512C16.445 30.008 15.5583 30.0026 15.0157 29.512ZM15.9997 18C16.6125 18 17.2193 17.8793 17.7855 17.6447C18.3517 17.4102 18.8662 17.0665 19.2995 16.6331C19.7328 16.1998 20.0766 15.6853 20.3111 15.1191C20.5456 14.553 20.6663 13.9461 20.6663 13.3333C20.6663 12.7205 20.5456 12.1136 20.3111 11.5474C20.0766 10.9813 19.7328 10.4668 19.2995 10.0335C18.8662 9.60012 18.3517 9.25638 17.7855 9.02186C17.2193 8.78733 16.6125 8.66663 15.9997 8.66663C14.762 8.66663 13.575 9.15829 12.6998 10.0335C11.8247 10.9086 11.333 12.0956 11.333 13.3333C11.333 14.571 11.8247 15.758 12.6998 16.6331C13.575 17.5083 14.762 18 15.9997 18Z" fill="#08D9C4"></path></svg>
                  <span>Location</span>
                </div>
                <p className={`${styles.infoText} ${styles.locationText}`}>8911 North Capital of Texas Highway, Suite 4200. #1007, Austin - TX -78759.</p>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoItemHeader}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M26.667 5.33337H5.33366C3.86699 5.33337 2.68033 6.53337 2.68033 8.00004L2.66699 24C2.66699 25.4667 3.86699 26.6667 5.33366 26.6667H26.667C28.1337 26.6667 29.3337 25.4667 29.3337 24V8.00004C29.3337 6.53337 28.1337 5.33337 26.667 5.33337ZM26.1337 11L16.707 16.8934C16.2803 17.16 15.7203 17.16 15.2937 16.8934L5.86699 11C5.7333 10.925 5.61622 10.8236 5.52284 10.702C5.42947 10.5804 5.36174 10.4411 5.32376 10.2925C5.28578 10.144 5.27833 9.98929 5.30187 9.83778C5.32541 9.68628 5.37944 9.54113 5.4607 9.41111C5.54196 9.28109 5.64876 9.16892 5.77463 9.08137C5.9005 8.99382 6.04282 8.93272 6.19299 8.90177C6.34315 8.87082 6.49804 8.87066 6.64826 8.9013C6.79849 8.93195 6.94094 8.99275 7.06699 9.08004L16.0003 14.6667L24.9337 9.08004C25.0597 8.99275 25.2022 8.93195 25.3524 8.9013C25.5026 8.87066 25.6575 8.87082 25.8077 8.90177C25.9578 8.93272 26.1002 8.99382 26.226 9.08137C26.3519 9.16892 26.4587 9.28109 26.5399 9.41111C26.6212 9.54113 26.6752 9.68628 26.6988 9.83778C26.7223 9.98929 26.7149 10.144 26.6769 10.2925C26.6389 10.4411 26.5712 10.5804 26.4778 10.702C26.3844 10.8236 26.2674 10.925 26.1337 11Z" fill="#08D9C4"></path></svg>
                  <span>Email</span>
                </div>
                <p className={styles.infoText}><a href="mailto:hello@ayrorides.com">hello@ayrorides.com</a></p>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoItemHeader}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M22.0745 17.2081L21.4678 17.8121C21.4678 17.8121 20.0238 19.2467 16.0838 15.3294C12.1438 11.4121 13.5878 9.97739 13.5878 9.97739L13.9692 9.59605C14.9118 8.66005 15.0012 7.15605 14.1785 6.05739L12.4985 3.81339C11.4798 2.45339 9.51317 2.27339 8.34651 3.43339L6.25317 5.51339C5.67584 6.08939 5.28917 6.83339 5.33584 7.66005C5.45584 9.77605 6.41317 14.3267 11.7518 19.6361C17.4145 25.2654 22.7278 25.4894 24.8998 25.2867C25.5878 25.2227 26.1852 24.8734 26.6665 24.3934L28.5598 22.5107C29.8398 21.2401 29.4798 19.0601 27.8425 18.1707L25.2958 16.7854C24.2212 16.2027 22.9145 16.3734 22.0745 17.2081Z" fill="#08D9C4"></path></svg>
                  <span>Phone</span>
                </div>
                <p className={styles.infoText}><a href="tel:+15125882849">+1 (512) 588-2849</a></p>
              </div>
            </div>

            <div className={styles.socialSection}>
              <h4>Social Contact</h4>

              <div className={styles.socialIcons}>

                <a href="https://www.facebook.com/profile.php?id=61583870717780" target="_blank" className={styles.socialIcon}>
                  <Image src="/assets/facebook-icon.png" alt="Facebook" width={32} height={32} />
                </a>

                <a href="https://x.com/ayro_inc" target="_blank" className={styles.socialIcon}>
                  <Image src="/images/x.png" alt="X" width={38} height={38} />
                </a>

                <a href="https://www.instagram.com/ayro.rideshare/" target="_blank" className={styles.socialIcon}>
                  <Image src="/assets/instagram-icon.png" alt="Instagram" width={32} height={32} />
                </a>

                <a href="https://www.youtube.com/@AYRO_Inc" target="_blank" className={styles.socialIcon}>
                  <Image src="/assets/youtube-icon.png" alt="YouTube" width={32} height={32} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.infoMapSide}>
            <div className={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3441.707439793437!2d-97.763435!3d30.3876644!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cb61b23fffff%3A0xf4e27075bee75f2e!2s8911%20N%20Capital%20of%20Texas%20Hwy%20Ste%204200%201007%2C%20Austin%2C%20TX%2078759%2C%20USA!5e0!3m2!1sen!2sin!4v1765634012502!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
