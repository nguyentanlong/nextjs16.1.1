import Image from "next/image";

// pages/index.js
export default function gioiThieu() {
  return (
    <>
      <>
        <section id="about" className="about section">
          {/* Section Title */}
          <div className="container section-title">
            <h2>About</h2>
            <p>
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>
          {/* End Section Title */}
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row align-items-center">
              <div className="col-lg-5" data-aos="fade-right" data-aos-delay={200}>
                <div className="profile-image-wrapper">
                  <div className="profile-image">
                    <img
                      src="assets/img/profile/profile-square-1.webp"
                      alt="Profile"
                      className="img-fluid"
                    />
                  </div>
                  <div className="signature-section">
                    <img
                      src="assets/img/misc/signature-1.webp"
                      alt="Signature"
                      className="signature"
                    />
                    <p className="quote">
                      Building meaningful digital experiences through creative code.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-7" data-aos="fade-left" data-aos-delay={300}>
                <div className="about-content">
                  <div className="intro">
                    <h2>Hi, I'm Brandon - a Creative Developer</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Vestibulum tortor quam,
                      feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                      libero sit amet quam egestas semper.
                    </p>
                  </div>
                  <div className="skills-grid">
                    <div
                      className="skill-item"
                      data-aos="zoom-in"
                      data-aos-delay={400}
                    >
                      <div className="skill-icon">
                        <i className="bi bi-palette" />
                      </div>
                      <h4>UI/UX Design</h4>
                      <p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar</p>
                    </div>
                    <div
                      className="skill-item"
                      data-aos="zoom-in"
                      data-aos-delay={450}
                    >
                      <div className="skill-icon">
                        <i className="bi bi-code-slash" />
                      </div>
                      <h4>Frontend Dev</h4>
                      <p>
                        Sed porttitor lectus nibh. Cras ultricies ligula sed magna
                      </p>
                    </div>
                    <div
                      className="skill-item"
                      data-aos="zoom-in"
                      data-aos-delay={500}
                    >
                      <div className="skill-icon">
                        <i className="bi bi-camera" />
                      </div>
                      <h4>Photography</h4>
                      <p>Vestibulum ac diam sit amet quam vehicula elementum</p>
                    </div>
                  </div>
                  <div
                    className="journey-timeline"
                    data-aos="fade-up"
                    data-aos-delay={300}
                  >
                    <div className="timeline-item">
                      <div className="year">2019</div>
                      <div className="description">
                        Graduated with B.A. in Digital Design from Creative University
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="year">2020</div>
                      <div className="description">
                        Joined InnovateTech as Junior Frontend Developer
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="year">2023</div>
                      <div className="description">
                        Launched freelance career specializing in creative web
                        solutions
                      </div>
                    </div>
                  </div>
                  <div
                    className="cta-section"
                    data-aos="fade-up"
                    data-aos-delay={400}
                  >
                    <div className="fun-fact">
                      <span className="emoji">☕</span>
                      <span className="text">
                        Coffee-fueled designer based in Portland
                      </span>
                    </div>
                    <div className="action-buttons">
                      <a href="#portfolio" className="btn btn-primary">
                        View My Work
                      </a>
                      <a href="#" className="btn btn-outline">
                        Download Resume
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /About Section */}
        {/* Skills Section */}
        <section id="skills" className="skills section">
          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row">
              <div className="col-lg-8">
                <div className="skills-grid">
                  <div className="row g-4">
                    <div
                      className="col-md-6"
                      data-aos="flip-left"
                      data-aos-delay={200}
                    >
                      <div className="skill-card">
                        <div className="skill-header">
                          <i className="bi bi-code-slash" />
                          <h3>Frontend Development</h3>
                        </div>
                        <div className="skills-animation">
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">HTML/CSS</span>
                              <span className="skill-percentage">95%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={95}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">JavaScript</span>
                              <span className="skill-percentage">88%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={88}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">Vue.js</span>
                              <span className="skill-percentage">82%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={82}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Frontend Card */}
                    </div>
                    <div
                      className="col-md-6"
                      data-aos="flip-left"
                      data-aos-delay={300}
                    >
                      <div className="skill-card">
                        <div className="skill-header">
                          <i className="bi bi-server" />
                          <h3>Backend Development</h3>
                        </div>
                        <div className="skills-animation">
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">PHP</span>
                              <span className="skill-percentage">78%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={78}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">Laravel</span>
                              <span className="skill-percentage">75%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">MySQL</span>
                              <span className="skill-percentage">72%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={72}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Backend Card */}
                    </div>
                    <div
                      className="col-md-6"
                      data-aos="flip-left"
                      data-aos-delay={400}
                    >
                      <div className="skill-card">
                        <div className="skill-header">
                          <i className="bi bi-palette" />
                          <h3>Design &amp; Tools</h3>
                        </div>
                        <div className="skills-animation">
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">Figma</span>
                              <span className="skill-percentage">85%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">Photoshop</span>
                              <span className="skill-percentage">70%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={70}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">Illustrator</span>
                              <span className="skill-percentage">68%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={68}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End Design Card */}
                    </div>
                    <div
                      className="col-md-6"
                      data-aos="flip-left"
                      data-aos-delay={500}
                    >
                      <div className="skill-card">
                        <div className="skill-header">
                          <i className="bi bi-cloud" />
                          <h3>Cloud &amp; DevOps</h3>
                        </div>
                        <div className="skills-animation">
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">AWS</span>
                              <span className="skill-percentage">76%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={76}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">Docker</span>
                              <span className="skill-percentage">73%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={73}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                          <div className="skill-item">
                            <div className="skill-info">
                              <span className="skill-name">Git</span>
                              <span className="skill-percentage">90%</span>
                            </div>
                            <div className="skill-bar progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={90}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End DevOps Card */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>

    </>
  );
}
