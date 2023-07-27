import React from "react";

 const Footer = () =>{
    return (
		<footer id="colophon" className="site-footer light text-dark">
		<div className="footer-widgets widgets-area widgets-4-columns-diff ">
			<div className="footer-container konte-container">
				<div className="row">
					<div className="footer-widgets-area-1 footer-widgets-area col-xs-12 col-sm-12 col-md-4">
						<div className="widget widget_text">
							<div className="textwidget">
								<p className="ml-n-5">
									<img className="logo-dark" src="../src/assets/images/logo.svg" alt="Konte Logo"/>
									<img src="../src/assets/images/logo-light.svg" alt="Konte" className="logo-light"/>
								</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,<br/> sed do eiusmod tempor incididunt ut labore</p><p>konte@uix.store<br/> +1 248-785-8545
								</p>
							</div>
						</div>
					</div>
					<div className="footer-widgets-area-2 footer-widgets-area col-xs-6 col-sm-6 col-md-2">
						<div className="widget widget_text">
							<div className="textwidget">
								<ul>
									<li><a href="#">Help</a></li>
									<li><a href="../page/faq.html">FAQs</a></li>
									<li><a href="#">Shipping</a></li>
									<li><a href="#">Order Tracking</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="footer-widgets-area-2 footer-widgets-area col-xs-6 col-sm-6 col-md-2">
						<div className="widget widget_text">
							<div className="textwidget">
								<ul>
									<li><a href="../page/about-us.html">About Us</a></li>
									<li><a href="../page/contact-us.html">Contact Us</a></li>
									<li><a href="../blog/blog-v1.html">Journal</a></li>
									<li><a href="#">Privacy Policy</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="footer-widgets-area-4 footer-widgets-area col-xs-12 col-sm-12 col-md-4">
						<div className="widget widget_text">
							<h4 className="widget-title">Join our list</h4>
							<div className="textwidget">
								<p>Signup to be the first to hear about exclusive deals, special offers and upcoming collections</p>
								<form className="mc4wp-form" method="post">
									<div className="mc4wp-form-fields">
										<input type="email" name="EMAIL" placeholder="Your email address" required="" autoComplete="off"/>
										<input type="submit" defaultValue="Subscribe"/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="footer-main site-info">
			<div className="footer-container konte-container"><hr className="divider"/></div>
			<div className="footer-container konte-container">
				<div className="footer-items footer-left">
					<div className="copyright">©2020 Konte.  All rights reserved</div>
				</div>
				<div className="footer-items footer-right">
					<nav className="menu-footer-menu-container">
						<ul className="footer-menu nav-menu menu">
							<li className="menu-item"><a href="#">Privacy Policy</a></li>
							<li className="menu-item"><a href="#">Help</a></li>
							<li className="menu-item"><a href="../page/faq.html">FAQs</a></li>
							<li className="menu-item"><a href="../page/contact-us.html">Contact Us</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</footer>
    );
}
export default Footer;