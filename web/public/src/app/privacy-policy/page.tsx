"use client";

import styles from "./privacy.module.css";

export default function PrivacyPolicy() {
    return (
        <main>
            {/* Header Section */}
            <section className={styles.headerSection}>
                <h1 className={styles.headerTitle}>
                    Privacy <span className={styles.blueText}>Policy</span>
                </h1>
                <p className={styles.effectiveDate}>Effective Date: December 3, 2025</p>
            </section>

            {/* Section Divider */}
            <div className={styles.sectionDivider}>
                <div className={styles.dividerContainer}>
                    <div className={styles.dividerTeal}></div>
                    <div className={styles.dividerBlue}></div>
                </div>
            </div>

            {/* Content Section */}
            <section className={styles.contentSection}>
                <div className={styles.contentContainer}>
                    <h2 className={styles.contentMainTitle}>Privacy Policy</h2>
                    <p>
                        The PikUP website, and its related services, products, software, and content (the "Services") are owned and operated by PikUP Inc., a Delaware corporation. ("PikUP", "our", "us", "we"). PikUP has adopted this Privacy Policy ("Privacy Policy") to inform you that it collects Personal Information when you use the Services and to explain how this information is used. This Privacy Policy applies to all online interactions with PikUP owned or managed websites and does not cover our offline data practices. Your personal information is not shared with unrelated third-party businesses except as set forth in this Privacy Policy. You should contact PikUP directly with any questions or concerns at &lt;Contact Email&gt;.
                    </p>

                    <p className={styles.warningText}>
                        PIKUP MAY CHANGE, MODIFY, AMEND, SUSPEND, TERMINATE, OR REPLACE THIS PRIVACY POLICY FROM TIME TO TIME AND WITHIN ITS SOLE AND ABSOLUTE DISCRETION. IN THE EVENT PIKUP CHANGES, MODIFIES, AMENDS, OR REPLACES THIS PRIVACY POLICY, THE EFFECTIVE DATE, LOCATED ABOVE, WILL CHANGE. YOUR CONTINUED USE OF THE SERVICES AFTER A CHANGE IN THE EFFECTIVE DATE OF THIS PRIVACY POLICY CONSTITUTES YOUR MANIFESTATION OF ASSENT TO THE CHANGE, MODIFICATION, AMENDMENT, OR REPLACEMENT CONTAINED WITHIN.
                    </p>

                    <h3 id="definitions">Definitions</h3>
                    <ul className={styles.iconList}>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}><b>California Consumer Privacy Act ("CCPA")</b> means the California statute intended to enhance privacy rights and consumer protection for residents of California, United States.</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}><b>General Data Protection Regulation ("GDPR")</b> means the European Union ("EU") law on data protection and privacy applicable to individuals within the EU.</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}><b>Personal Data </b>means any information relating to an identified or identifiable natural person, an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person.</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}><b>Personal Information </b>under the CCPA means information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or household. For purposes of this Privacy Policy, "Personal Data" is included within this definition.</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}><b>"User(s)" </b>means all individuals that visit and access the Services.</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}><b>"You / Your / You're" </b>means refers to the individual User accessing or using the Services.</span>
                        </li>
                    </ul>

                    <h3>Types of Personal Information We Collect.</h3>
                    <p>PikUP collects the following Personal Information from all Users who contact PikUP seeking more information and use the Services:</p>
                    <ul className={styles.iconList}>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>First name;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Last name;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Email address;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Phone number;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Any other information that you upload or submit to the Services directly or indirectly.</span>
                        </li>
                    </ul>

                    <p>In addition, PikUP may collect the following Personal Information from Users:</p>
                    <ul className={styles.iconList}>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Your geolocation;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Your IP address;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Your browser and search engine information;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Your device information;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Your visitor history;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Your usage of the Services, including, without limitation, any links or items clicked or pages viewed and statistics;</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Information stored in cookies, pixel tags, or web beacons; and</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>Any other additional analytic data that you voluntarily submit to the Services.</span>
                        </li>
                    </ul>

                    <p>In addition, PikUP collects information that you submit while using our Services, including prompts, queries, uploaded files, and any generated outputs associated with your account. These inputs and outputs may be stored, reviewed, and used to improve the Services, monitor misuse, and provide technical support. You should not provide inputs containing sensitive categories of data (such as health information, financial account numbers, or government identifiers) unless strictly necessary for your use of the Services.</p>

                    <h3>Sources of Personal Information Collection.</h3>
                    <p>PikUP may collect this Personal Information from you through various channels, including, but not limited to, through your voluntary submission of information to the Services, through requests initiated by you through the Services, through the collection and analysis of information concerning your computer and browsing activities, through the use of cookies, web beacons, pixel tags, and through other sources permitted by law.</p>

                    <h3>Cookies & Similar Technologies.</h3>
                    <p>The Services also utilizes Cookies. Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the Cookie. We use Cookies and similar technologies to enable our systems to recognize your browser and to provide certain features. We also use "web beacons" to help deliver Cookies and gather usage and performance data. The Services may also include Cookies, web beacons, and other similar technologies from third-party service providers.</p>
                    <p>You have a variety of tools available to control the data collected by Cookies, web beacons, and similar technologies. For example, you can use controls in your Internet browser to limit how the websites you visit are able to use Cookies and to withdraw your consent by clearing or blocking Cookies. You can also stop PikUP from placing Cookies (other than those required for the Services to function) on your device by referencing the instructions below or opting out using the Cookie notification opt-out on your initial visit to the Services.</p>

                    <h3>Lawful Basis for Processing Your Personal Information</h3>
                    <p>The lawful basis for us processing your Personal Information for the uses described in this Policy will typically be because you have provided your consent; it is necessary for our contractual relationship; the processing is required for us to comply with legal obligations; and/or the processing is in our legitimate interest of providing the Services, improving the Services and other related services, and provide targeted offerings.</p>

                    <h3>How PikUP Uses Your Personal Information.</h3>
                    <p>We use your Personal Information based upon the legal basis of Users' consent to provide you with the Services, including waitlist confirmation and marketing communications, process any requests made by you, communicate with you, identify and fix problems with the Services, and update you regarding changes to the Services and the PikUP and third-party services offered through the Services.</p>
                    <p>By using the Services, you further authorize the following specific uses of your Personal Information:</p>
                    <ul className={styles.iconList}>
                        {[
                            "Enable your use of the Services and its associated services;",
                            "Measure service usage;",
                            "Develop new features;",
                            "Contact and communicate with you, whether through email, telephone, text message, and/or messages within the Services;",
                            "Customize and/or tailor the Services and your user experience, which may include targeted selection and display of third-party advertisements within the Services;",
                            "Aggregate and de-identify certain information that does not include your personal information and disclose it for analysis, demographic profiling and/or targeted advertising;",
                            "Advertise software, products, and services of PikUP;",
                            "Transmit and process your information and actions within the Services;",
                            "Provide statistical information, and include you in the same, where applicable;",
                            "Provide you with technical service and support, including updates;",
                            "Provide you with information concerning PikUP's benefits or services;",
                            "Store, archive, retrieve, and make copies of your user generated content;",
                            "Understand your needs and requests;",
                            "Communicate promotions or other offers;",
                            "Process payments;",
                            "Prevent and detect illegal activities or violations of your Terms of Use;",
                            "Combine your personal and personally identifiable information with information from other PikUP applications and/or services;",
                            "Facilitate your use of the Services and upgrades/replacements to the Services;",
                            "Operate, maintain, and improve our Services;",
                            "Deliver generated outputs in response to your inputs and requests; and",
                            "Analyze and enhance performance, safety, and fairness;"
                        ].map((item, index) => (
                            <li key={index} className={styles.iconListItem}>
                                <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                                <span className={styles.listText}>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <h3>Sharing of Your Personal Information.</h3>
                    <p>PikUP shares Your Personal Information with third parties in the following circumstances:</p>
                    <ul className={styles.iconList}>
                        {[
                            "Where PikUP has obtained your consent;",
                            "Where you opt into a service provided by a third party directly from the PikUP platform, such as a proofreading or notarization service.",
                            "Where sharing or disclosure of your Personal Information is necessary to provide you with the Services, and/or associated services (We may share your personal or personally identifiable information with trusted third-parties who assist us in operating the Services, providing the associated services, and conducting our business);",
                            "Where sharing or disclosure of your Personal Information is necessary to share personal or personally identifiable information with PikUP's parents, subsidiaries, successors, assigns, licensees, affiliates, or business partners;",
                            "Where PikUP has been purchased by a third party;",
                            "Where sharing or disclosure of your Personal Information is necessary to respond to requests by government authorities;",
                            "Where your Personal Information is demanded by a court order or subpoena;",
                            "Where sharing or disclosure of your Personal Information is needed to protect the employees, independent contractors, officers, directors, members, users, or owners/shareholders of PikUP;",
                            "Where sharing or disclosure of your Personal Information is needed to help prevent against fraud or the violation of any applicable law, statute, regulation, ordinance, or treaty; and",
                            "Where PikUP is otherwise legally obligated to share your personal or personally identifiable information to comply with applicable law, governmental requests, judicial proceedings, court orders, subpoenas, or lawful requests from public authorities, including to meet national security or law enforcement requirements."
                        ].map((item, index) => (
                            <li key={index} className={styles.iconListItem}>
                                <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                                <span className={styles.listText}>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <h3>PikUP Shares Your Personal Information With the Following Third-Parties:</h3>
                    <ul className={styles.iconList}>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                            <span className={styles.listText}>
                                Referral Hero (privacy policy <a href="https://referralhero.com/privacy-policy" target="_blank" rel="noopener" className={styles.linkUnderline}>here</a>);
                            </span>
                        </li>
                    </ul>
                    <p>This list may not be exhaustive as to all the third-parties PikUP may share your Personal Information with. PikUP is committed to keeping track of which third-parties receive your Personal Information internally.</p>

                    <h3>No Liability Third-Party Services and Third-Party Links.</h3>
                    <p>The third-party service providers affiliated with PikUP have their own independent privacy policies governing the use of your Personal Information pursuant to the GDPR and CCPA and we encourage you to read those privacy policies carefully. You understand that even if PikUP deletes your Personal Information it may still be available in a third-party service provider's database. PikUP has no responsibility or liability for the Personal Information collection, use, or storage activities of the third-party services providers used by PikUP to provide you with the services associated with the Services.</p>
                    <p>PikUP may outsource or subcontract some of our technical support, tracking and reporting functions, database management functions, and other services to third parties. We may share information from or about you with them so that they can perform their services as long as they comply with this Privacy Policy, the GDPR, and the CCPA as applicable. You understand and agree that PikUP will not be held responsible for any third-party communications sent by entities that PikUP does not own or control. You are encouraged to review any third-party privacy policies before utilizing any such third-party service.</p>

                    <h3>Personal Information Transfer and Storage.</h3>
                    <p>Your Personal Information is stored and processed on computers and servers in the United States. This list may expand and include other countries not listed here. Your information may be processed on servers located outside of the country where you live. Data protection laws vary among countries, with some providing more protection than others. Regardless of where your information is stored and processed, we apply the same protections described in this policy. Through your use of the Services, you consent to the processing and storage of your Personal Information and personally identifiable information. You understand that your Personal Information may be transferred to – and maintained on – computers located outside of your state, province, country, or other governmental jurisdiction. If you are located outside the countries listed and choose to provide Personal Information to us, please note that we transfer your Personal Information to the countries listed and process it there, and that we may store portions of your Personal Information in said countries.</p>

                    <h3>Personal Information Security.</h3>
                    <p>PikUP uses organizational and technical security measures designed to protect the security of your Personal Information. Though we undertake commercially reasonable efforts to protect your information, no website, software, or online service is completely safe. Accordingly, you provide such information at your own risk.</p>

                    <h3>EU Users' Rights Under the GDPR.</h3>
                    <p>The GDPR provides Users located in the EU under its protection certain rights with respect to their Personal Data collected by us on the Services. Accordingly, PikUP recognizes and will comply with the GDPR and those rights, except as limited by applicable law.</p>

                    <h3>California Users' Rights.</h3>
                    <p>Under the CCPA, California Users have the following rights:</p>
                    <ul className={styles.iconList}>
                        {[
                            ["Right to Know About Personal Information Collected, Disclosed, or Sold: ", "You have the right to request that PikUP disclose what Personal Information of yours it collects, uses, discloses, and sells over the past 12 months."],
                            ["Right to Have Personal Information Deleted:", " You have the right to request that PikUP delete any of your Personal Information that we collected from you."],
                            ["Right to Opt-Out of the Sale of Personal Information: ", "PikUP does not sell Personal Information. "],
                            ["Right to Non-Discrimination:", " PikUP shall not discriminate against California Users for exercising their rights under the CCPA. "],
                            ["Right to Correction: ", "You have the right to request that PikUP make any updates or amendments to any incorrect data records. "],
                            ["Right to Access Information About Automated Decision Making:", " You have the right to request information about automated decision-making processes based on your Personal Information. "],
                            ["Right to Opt-Out of Automated Decision-Making Technology:", " You have the right to request to opt-out of the use of automated decision-making technology. "]
                        ].map(([title, desc], index) => (
                            <li key={index} className={styles.iconListItem}>
                                <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                                <span className={styles.listText}><b>{title}</b>{desc}</span>
                            </li>
                        ))}
                    </ul>

                    <h3>Supplemental Notice for Residents of Other US States.</h3>
                    <p>Residents of certain other states, such as Colorado, Virginia, and Connecticut, may have certain rights regarding their "personal data," as defined in these states' laws ("Personal Information"), that we process.</p>
                    <ul className={styles.iconList}>
                        {[
                            "Confirm whether or not we are processing your personal information and provide you with access to such personal information;",
                            "Correct inaccuracies in your personal information, taking into account the nature of the personal information and the purposes of the processing of the personal information;",
                            "Delete your personal information;",
                            "Provide you a copy of personal information that you previously provided to us in a portable and, to the extent technically feasible, readily usable format that allows you to transmit the data to another business, where our processing is carried out by automated means; and",
                            "Opt you out of processing of personal information for purposes of profiling in furtherance of decisions that produce legal or similarly significant effects concerning you (please note that we do not engage in this kind of processing)."
                        ].map((item, index) => (
                            <li key={index} className={styles.iconListItem}>
                                <span className={styles.iconWrapper}><svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg></span>
                                <span className={styles.listText}>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <h3>Notice for Nevada Residents.</h3>
                    <p>Under Nevada law, certain Nevada consumers may opt out of the sale of Personal Information for monetary consideration. We do not engage in such activity; however, if you are a Nevada resident who has purchased or leased goods or services from us, you may submit a request to opt out of any potential future sales under Nevada law. We will verify this request by ensuring that such request is from an email address associated with a User's account or with a user to a reasonably high degree of certainty.</p>

                    <h3>Purchase or Sale of the Services or Other Assets.</h3>
                    <p>PikUP may purchase other businesses or sell components of its business, including, but not limited to, the Services. In the event PikUP purchases another business or sells any component of its business, your Personal Information will continue to be used consistent with the terms of this Privacy Policy.</p>

                    <h3>How To Stop PikUP from collecting your Personal Information.</h3>
                    <p>You can stop PikUP from collecting your Personal Information by contacting PikUP at &lt;Contact Email&gt; and requesting that PikUP stop collecting your Personal Information.</p>

                    <h3>Your Obligations.</h3>
                    <p>When using the Services, you are obligated to inform PikUP of any changes to your Personal Information.</p>

                    <h3>Children's Online Privacy Protection Policy.</h3>
                    <p>The Services are not intended for or directed to users under the age of 18, and PikUP does not knowingly or intentionally collect Personal Information from children under the age of 13 or other minors. Where appropriate, PikUP takes reasonable measures to determine that users are adults of legal age and to inform minors not to submit such information to the Services or in response to advertisements. If we discover we have collected personal information from a minor under 18, we will deactivate the account and take reasonable measures to promptly delete such data from our records.</p>

                    <h3>Contact and Notices.</h3>
                    <p>All questions and concerns regarding this Privacy Policy may be submitted to PikUP at:</p>
                    <p>&lt;Contact Email&gt;</p>
                    <p>&lt;Name of Person or Department of Contact&gt;</p>
                    <p>&lt;Mailing Address&gt;</p>
                </div>
            </section>
        </main>
    );
}
