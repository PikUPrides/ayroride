"use client";

import styles from "./terms.module.css";

export default function TermsOfService() {
    return (
        <main>
            {/* Header Section */}
            <section className={styles.headerSection}>
                <h1 className={styles.headerTitle}>
                    Terms of <span className={styles.blueText}>Service</span>
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
                    <h2 className={styles.contentMainTitle}>Terms of Service Agreement</h2>

                    <p>The PikUP website and its associated services, products, software, and content (collectively “Services”) is owned and operated by PikUP Inc. (“PikUP”, “our”, “us”, “we”), a Delaware corporation. PikUP has adopted this Terms of Service Agreement (“Agreement”) to inform you (“User(s)”) of your rights and duties when using the Services. If you do not agree with the terms and conditions of this Agreement, you are expressly prohibited from using the Services and must discontinue your use immediately.</p>

                    <p className={styles.warningText}>PIKUP MAY, FROM TIME TO TIME, AND RESERVES THE RIGHT, IN ITS SOLE AND ABSOLUTE DISCRETION, TO MODIFY, LIMIT, CHANGE, DISCONTINUE, OR REPLACE THE SERVICES OR THIS AGREEMENT. IN THE EVENT PIKUP MODIFIES, LIMITS, CHANGES, OR REPLACES THE SERVICES OR THIS AGREEMENT, YOUR USE OF THE SERVICES AFTER SAID MODIFICATION, LIMITATION, CHANGE, OR REPLACEMENT CONSTITUTES YOUR MANIFESTATION OF ASSENT TO THE MODIFICATION, LIMITATION, CHANGE, OR REPLACEMENT.</p>

                    <h3>Definitions</h3>
                    <p>As used in this Agreement:</p>
                    <ul className={styles.iconList}>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}>
                                <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
                            </span>
                            <span className={styles.listText}><b>“User(s)” </b>means all individuals that visit the Services.</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}>
                                <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
                            </span>
                            <span className={styles.listText}><b>“Services” </b> means the PikUP website, products, and any associated services, software, or content.</span>
                        </li>
                        <li className={styles.iconListItem}>
                            <span className={styles.iconWrapper}>
                                <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
                            </span>
                            <span className={styles.listText}><b>“You / Your / You’re”  </b>means refers to the individual User accessing or using the Services.</span>
                        </li>
                    </ul>

                    <h3>About the Services</h3>
                    <p>PikUP provides an online software platform that will assist users and drivers in the rideshare space (the “Services”). The Services are pre-launch and are designed to enhance the user and driver experience as related to rideshare programs.</p>

                    <h3>Third-Party Platforms</h3>
                    <p>Certain features of the Services are run by or enable you to connect, access, and take actions with third-party platforms, including Referral Hero. By accessing the Services, you authorize PikUP to act on your instructions to interface with your linked third-party accounts and to transmit, retrieve, create, modify, and delete content on your behalf as necessary to provide the Services. You acknowledge and agree that your use of the Services includes any third-party platform and remains subject to that platform’s applicable terms, rules, and policies, which are in addition to this Agreement. Without limitation, you agree that your use of the Services is subject to <a href="https://referralhero.com/terms" target="_blank" rel="noopener" className={styles.linkUnderline}>Referral Hero’s Terms of Service</a> and related policies, and you will comply with them at all times.</p>

                    <h3>Warranties and Representations</h3>
                    <p>By accessing or using the Services, you represent, warrant, and agree to the following terms:</p>
                    <ul className={styles.iconList}>
                        {[
                            "You have the legal right and capacity to enter into this Agreement and to comply with its terms. You represent that you are a human individual who is at least eighteen (18) years of age. If you are between the ages of thirteen (13) and eighteen (18), you may only access and use the Services under the supervision of a parent or legal guardian who accepts this Agreement on your behalf. You further represent that you are not prohibited from entering into this Agreement by any applicable law or by any pre-existing agreement.",
                            "All information you submit to the Services is, to the best of your knowledge, current, accurate, and complete. You agree to promptly update such information if it becomes outdated or incorrect. You acknowledge that the submission of false, misleading, or incomplete information may result in suspension or termination of your access to the Services.",
                            "You agree to use the Services only in accordance with all applicable local, state, national, and international laws, rules, and regulations, including but not limited to those relating to intellectual property, privacy, data protection, anti-money laundering, and sanctions compliance. You will not use the Services in any manner that infringes upon, misappropriates, or otherwise violates the rights of any third party. You will not access the Services through automated or non-human means, except for standard RSS feeds.",
                            "You acknowledge that the Services is operated within the United States and is not intended for access or use from jurisdictions where such access or use is unlawful. You are solely responsible for determining whether your use of the Services is lawful in your jurisdiction and agree to use the Services entirely at your own risk if accessing it from outside the United States.",
                            "You represent that you are not a resident of, or otherwise accessing the Services from, any jurisdiction subject to comprehensive U.S. trade sanctions or export restrictions, including but not limited to Cuba, Iran, North Korea, Syria, or the Crimea region. You also represent that you are not listed on any U.S. government list of prohibited or restricted parties, such as the Specially Designated Nationals and Blocked Persons List (SDN List), and are not using the Services for the benefit of any such person or entity. PikUP does not support Users located in or accessing the Services from jurisdictions subject to comprehensive U.S. sanctions",
                            "You agree to use the Services in good faith and in a manner consistent with its intended purpose. You will not attempt to undermine, circumvent, or exploit the Services’ functionality, review systems, or technical safeguards.  The Services is operated in the United States. If you access the Services from outside the United States, you consent to the transfer, storage, and processing of your data in the United States. PikUP makes no representation that the Services is appropriate or available for use in other jurisdictions, and access from jurisdictions where such access is illegal is prohibited.",
                            "PikUP reserves the right, but not the obligation, to monitor the Services for violations of this Agreement, to take appropriate legal action against anyone who violates this Agreement (including reporting such User to law enforcement authorities), and to otherwise manage the Services in a manner designed to protect PikUP’s rights and property and to facilitate the proper functioning of the Services."
                        ].map((text, index) => (
                            <li key={index} className={styles.iconListItem}>
                                <span className={styles.iconWrapper}>
                                    <svg aria-hidden="true" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
                                </span>
                                <span className={styles.listText}>{text}</span>
                            </li>
                        ))}
                    </ul>

                    <h3>Beta Services; Maintenance</h3>
                    <p>PikUP may, from time to time, offer access to the Services that is classified as Beta version. PikUP makes no representations that a Beta version will ever be made generally available and reserves the right to discontinue or modify a Beta version of the Services at any time without notice. Beta versions of the Services is provided AS IS, and may contain bugs, errors, or other defects. Your use of a Beta version is at your sole risk.</p>
                    <p>PikUP will make commercially reasonable efforts to maintain access to the Services. However, you acknowledge and agree that PikUP may suspend, restrict, or disable access to the Services or any part thereof at any time and without notice, including for maintenance, updates, security patches, or events beyond its control, such as network failures, third-party service outages, force majeure events, legal or compliance obligations, or denial-of-service attacks.</p>
                    <p>PikUP makes no guarantees regarding the availability, uptime, or uninterrupted access to the Services, and shall not be liable for any loss, damage, or inconvenience suffered as a result of any downtime, delay, or unavailability. You acknowledge that PikUP has no obligation to maintain or support the Services for any minimum period of time.</p>

                    <h3>Ownership of Services and License</h3>
                    <p>You acknowledge and agree that PikUP is the sole and exclusive owner of, or otherwise possesses valid rights in and to, the Services and all elements thereof, including but not limited to the codebase, software architecture, content, APIs, documentation, interfaces, text, design, artwork, graphics, metadata schemas, look and feel, layout, and all content, trade dress, and branding therein or related thereto. PikUP hereby grants you a limited, non-exclusive, non-sublicensable, royalty free, non-assignable, and revocable license to use the Services for its customary and intended purposes. Violation of the terms of this Agreement or use of the Services for a use outside of its customary and intended purposes, such as, but not limited to downloading (other than page caching) or modifying the Services or any portion of it will result in the termination of this license.  Absent prior written permission from PikUP, you are not permitted to reproduce, prepare derivative works, distribute copies, perform, display, or use for commercial purposes the Services or its content.  This license is revocable at any time, and any rights not expressly granted herein are reserved to PikUP. </p>

                    <h3>Intellectual Property</h3>
                    <p>All trademarks (common law or registered), copyrights (common law or registered), and proprietary rights in and to the Services are the property of PikUP. All PikUP marks are the property of PikUP, including, but not limited to PIKUP, and all PikUP logos. The Services, including its look and feel, color selections, layout, and arrangement, is the trade dress of PikUP. You are prohibited from using PikUP’s trademarks, service marks, and trade dress, or any colorable imitation thereof, to indicate the source of, sponsorship of, approval of, affiliation with, connection with, or association with your goods or services without the prior written consent of PikUP. PikUP reserves the right to revoke or condition any permissions granted at its sole discretion.</p>

                    <h3>Use of Services and Your Responsibilities</h3>
                    <p>You may use the Services only as expressly permitted under this Agreement and solely for its intended purpose. You understand and agree that the Services is provided “AS IS” and “AS AVAILABLE”, and may be updated, modified, suspended, or discontinued at any time, in whole or in part, without notice and without liability. The Services may contain errors, bugs, or other defects, and your use of the Services is entirely at your own risk. Users are solely responsible for their use of the Services and shall abide by, and ensure compliance with, all laws in connection with use of the Services, including, but not limited to, laws related to recording, intellectual property, privacy, data protection, consumer protection, and export control. You agree not to use the Services for any unlawful or unauthorized purpose or in a manner that infringes upon the rights of any third party.</p>
                    <p>You have a duty to ensure that the information provided through the Services is truthful, current, complete, and accurate. You understand and agree that you have an ongoing duty to update and keep current the information provided through the Services if and when that information changes. You are expressly prohibited from providing information that in a way impersonates another person, contains offensive or obscene language, or otherwise violates the rights of a third party. You expressly agree that you will not interfere with or disrupt a third party’s enjoyment and use of the Services. PikUP reserves the right to restrict access to, monitor, suspend, disable, or delete Users’ information at any time, in its sole discretion, and without prior warning. You further acknowledge that PikUP has no obligation to monitor or moderate activity but reserves the right to do so for the protection of the Services and its users. You agree to hold harmless and indemnify PikUP for any damages that arise out of or in relation to the use of the Services.</p>

                    <h3>Prohibited Uses</h3>
                    <p>You expressly agree that you will not use the Services to violate any law, statute, ordinance, regulation, or treaty, to violate the rights of third parties, or for a use outside of the customary and intended purposes of the Services.</p>

                    <h3>Mobile Devices</h3>
                    <p>In the event PikUP provides access to the Services via a mobile device: to the extent you access the Services through a mobile device, your wireless carrier’s standard charges, rates, and fees may apply.  PikUP is not responsible for any data usage, roaming charges, or mobile-related fees or errors that occur while accessing the Services via mobile device.</p>

                    <h3>Section 230 of Communications Decency Act</h3>
                    <p>You acknowledge and agree that PikUP is an interactive computer service provider under Section 230 of the Communications Decency Act. Though PikUP may edit, remove, or control the content displayed through the Services, you agree that PikUP will not be considered an information content provider and will not be held liable for the republication of defamatory or tortious content created by third parties, whether through the Services or otherwise. You acknowledge and agree that PikUP is not responsible for, and does not endorse, any content embedded in or linked posted to the Services, even if such content remains accessible via the Services. </p>

                    <h3>Term and Termination</h3>
                    <p>This Agreement will remain in full force and effect so long as the Services is in operation.  PikUP may terminate this Agreement without liability at any time, without notice, and for any reason, including but not limited to for your violation of a term or condition of this Agreement. Upon termination of this Agreement, your right to use the Services will immediately cease. PikUP will have no obligation to maintain or preserve any data, submissions, or transaction history following termination, except as required by law or our Privacy Policy.</p>

                    <h3>Disclaimer of Warranties</h3>
                    <p className={styles.warningText}>YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. YOU UNDERSTAND THAT WE DO NOT GUARANTEE THE ACCURACY, SAFETY, INTEGRITY OR QUALITY OF THE SERVICES AND YOU HEREBY AGREE THAT YOU MUST EVALUATE AND BEAR ALL RISKS ASSOCIATED WITH USE OF THE SERVICES, INCLUDING ANY RELIANCE ON THE SERVICES, AND INTEGRITY AND ACCURACY OF THE SERVICES. NOTHING ON THE SERVICES SHOULD BE DEEMED TO CONSTITUTE A RECOMMENDATION TO PURCHASE, SELL OR HOLD, OR OTHERWISE TO CONSTITUTE ADVICE REGARDING ANY REGISTERED OR UNREGISTERED SECURITY.</p>
                    <p className={styles.warningText}>PIKUP DISCLAIMS ANY RESPONSIBILITY FOR ANY HARM OR LIABILITY ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES. PIKUP DOES NOT WARRANT THAT THE SERVICES WILL BE ERROR-FREE, UNINTERRUPTED, OR FREE OF VIRUSES, MALWARE, OR OTHER HARMFUL COMPONENTS. PIKUP PROVIDES THE SERVICES ON AN AS-IS BASIS AND WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, COMPLETENESS, NON-INFRINGEMENT, OR QUALITY. SOME JURISDICTIONS DO NOT ALLOW AN EXCLUSION OF IMPLIED WARRANTIES. IF YOU ARE LOCATED IN SUCH A JURISDICTION, THIS EXCLUSION MAY NOT APPLY.</p>
                    <p className={styles.warningText}>PIKUP WILL NOT BE HELD LIABLE OR RESPONSIBLE TO YOU FOR ANY LOSS AND TAKE NO RESPONSIBILITY FOR, AND WILL NOT BE LIABLE TO YOU FOR; ANY USE OF THE SERVICES OR CONTENT, INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES, OR CLAIMS ARISING FROM: (A) USER ERROR, INCORRECTLY CONSTRUCTED TRANSACTIONS, OR MISTYPED ADDRESSES; (B) SERVER FAILURE OR DATA LOSS; (C) UNAUTHORIZED ACCESS OR USE; (D) ANY UNAUTHORIZED THIRD-PARTY ACTIVITIES, INCLUDING WITHOUT LIMITATION THE USE OF VIRUSES, HACKING, PHISHING, BRUTE FORCING OR OTHER MEANS OF ATTACK AGAINST THE SERVICES.</p>
                    <p className={styles.warningText}>PIKUP WILL NOT BE HELD LIABLE OR RESPONSIBLE FOR ANY CONTENT POSTED ON THE SERVICES, ANY THIRD-PARTY LINKS POSTED ON THE SERVICES, OR ANY CONTENT TRANSMITTED THROUGH THE SERVICES. PIKUP IS A SERVICE PROVIDER AND DOES NOT ASSUME RESPONSIBILITY FOR ANY ERROR, OMISSION, INTERRUPTION, DELETION, DEFECT, ALTERATION, AND/OR DESTRUCTION OF IDENTITY. PIKUP RESERVES THE RIGHT TO DISCONTINUE THE SERVICES AT ANY TIME.</p>
                    <p className={styles.warningText}>PIKUP DOES NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED SERVICES, OR ANY SERVICES OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING. PIKUP WILL NOT BE A PARTY TO OR IN ANY WAY RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. PIKUP WILL NOT BE HELD LIABLE FOR NETWORK, INTERNET, COMPUTER, HARDWARE, OR SOFTWARE PROGRAM MALFUNCTIONS, FAILURE, DELAYS, OR DIFFICULTIES WITH THE SERVICES AT ANY TIME.</p>
                    <p className={styles.warningText}>SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES. IF SUCH LAWS APPLY TO YOU, SOME OF THE ABOVE DISCLAIMERS MAY NOT APPLY, AND YOU MAY HAVE ADDITIONAL RIGHTS UNDER APPLICABLE LAW.</p>

                    <h3>Limitation of Liability</h3>
                    <p className={styles.warningText}>PIKUP WILL NOT BE LIABLE TO YOU UNDER ANY LEGAL THEORY FOR ANY DAMAGES, CLAIMS, INJURIES, JUDGMENTS, COSTS, OR LIABILITIES ARISING OUT OF OR RELATED TO YOUR USE OR MISUSE OF THE SERVICES INCLUDING, BUT NOT LIMITED TO, LOSS OF BUSINESS, LOSS OF INCOME, SPECIAL DAMAGES, INCIDENTAL DAMAGES, CONSEQUENTIAL DAMAGES, PUNITIVE DAMAGES, OR EXEMPLARY DAMAGES.</p>
                    <p className={styles.warningText}>YOU UNDERSTAND AND AGREE THAT THE MAXIMUM AMOUNT THAT PIKUP CAN BE HELD LIABLE TO YOU UNDER ANY CIRCUMSTANCE IS THE AMOUNT THAT YOU PAID, IF ANY, FOR THE SERVICES, AND SPECIFICALLY, FOR THE INDIVIDUAL CONTENT, PRODUCT, OR SUBSCRIPTION GIVING RISE TO THE CLAIM. IN NO CASE SHALL PIKUP’S CUMULATIVE LIABILITY EXCEED THE GREATER OF (A) THE AMOUNT PAID, IF ANY, BY YOU TO USE DURING THE TWELVE (12) MONTH PERIOD PRIOR TO THE EVENT OR CIRCUMSTANCE GIVING RISE TO THE CLAIM; OR (B) $100.</p>
                    <p className={styles.warningText}>THE SERVICES MAY CONTAIN TECHNICAL INACCURACIES OR TYPOGRAPHICAL ERRORS OR OMISSIONS. PIKUP IS NOT RESPONSIBLE FOR ANY SUCH TYPOGRAPHICAL, TECHNICAL, OR PRICING ERRORS LISTED ON THE SERVICES. THE FOREGOING LIMITATIONS OF LIABILITY ARE AN ESSENTIAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN YOU AND PIKUP. THESE LIMITATIONS APPLY EVEN IF ANY LIMITED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.</p>
                    <p className={styles.warningText}>SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF DAMAGES. IF YOUR JURISDICTION DOES NOT ALLOW THE EXCLUSION OR LIMITATION OF DAMAGES, YOU SHOULD SEEK LEGAL COUNSEL TO UNDERSTAND YOUR LEGAL RIGHTS UNDER THE LAW.</p>

                    <h3>Jurisdiction, Governing Law, and Resolution of Disputes via Arbitration</h3>
                    <p>This Agreement will be interpreted, governed, construed, and enforced in accordance with the laws of the United States of America and the State of Delaware without giving effect to any conflicts of laws principles.  The parties submit to and agree to personal jurisdiction in the State of Delaware, with venue proper in Joplin. Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Terms of Use.</p>

                    <h3>Severability</h3>
                    <p>If any provision of this agreement is found to be invalid, illegal, or unenforceable for any reason, such provision shall be modified to the minimum extent necessary to make it enforceable, or if that is not possible, deemed severed from this agreement, and the remaining provisions shall remain in full force and effect.</p>

                    <h3>Integration</h3>
                    <p>PikUP hereby incorporates its Privacy Policy and any policies or operating rules posted by us on the Services or in respect to the Services into this Agreement. This Agreement and its incorporated policies constitute the entire agreement between the parties with respect to the use of the Services. Certain services provided through the Services may be subject to additional terms and conditions. You will be asked to review and agree to those terms before using such services. You acknowledge and agree that any additional provisions that may appear in any communication from you will not bind PikUP.</p>

                    <h3>No Waiver </h3>
                    <p>You understand and agree that no term or provision of this Agreement will be deemed to have been waived and no breach will be deemed to have been consented to unless said waiver or consent is in writing and signed by the party to be charged.</p>

                    <h3>Child Online Privacy Protection Act</h3>
                    <p>The Services is not directed to persons under the age of eighteen (18) and PikUP will not knowingly collect personally identifiable information from children under the age of eighteen (18) for the creation of User accounts. If PikUP inadvertently collects such personally identifiable information outside of the purposes of the Services, PikUP will delete the personally identifiable information in accordance with its security protocols.</p>

                    <h3>California Residents Notice</h3>
                    <p>In accordance with California Civil Code Section 1789.3, Users resident in California using the Services may contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834, or by telephone at (800) 952-5210. Among other things, a California resident may make contact to them in order to resolve a complaint regarding the Services or to receive further information regarding use of the Services.</p>

                    <h3>Limitation on Actions</h3>
                    <p className={styles.warningText}>PIKUP AND YOU BOTH AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO THE SERVICES MUST COMMENCE WITHIN ONE YEAR AFTER THE CAUSE OF ACTION ACCRUES. FAILURE TO ASSERT SAID CAUSE OF ACTION WITHIN ONE YEAR WILL PERMANENTLY BAR ANY AND ALL RELIEF.</p>
                    <p className={styles.warningText}>YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AGAINST PIKUP ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING AND YOU WILL ONLY BE PERMITTED TO SEEK RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ON AN INDIVIDUAL BASIS.</p>

                    <h3>Reservation of Rights</h3>
                    <p>All rights not expressly granted herein are reserved to PikUP. </p>

                    <h3>Notice</h3>
                    <p>Any notice required by this Agreement must be in writing and must be sent to: </p>
                    <p>&lt;Name of Person or Department of Contact&gt;</p>
                    <p>&lt;Mailing Address&gt;</p>
                    <p>&lt;Contact Email&gt;</p>
                </div>
            </section>
        </main>
    );
}
