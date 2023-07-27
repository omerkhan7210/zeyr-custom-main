import React from "react"


const SizeGuide = () => {
    return (
        <div id="size-guide-panel" className="size-guide-panel offscreen-panel">
								<div className="backdrop"></div>
								<div className="panel">
									<div className="hamburger-menu button-close active">
										<span className="menu-text">Close</span>
										<div className="hamburger-box">
											<div className="hamburger-inner"></div>
										</div>
									</div>
									<div className="panel-header">
										<h3>Size Guide</h3>
									</div>
									<div className="panel-content">
										<div className="konte-size-guide">
											<div className="konte-size-guide-tabs konte-tabs konte-tabs--horizontal">
												<ul className="konte-tabs__nav">
													<li data-target="1" className="active">Overview</li>
													<li data-target="2" className="">Jeans &amp; Trousers</li>
												</ul>
												<div className="konte-tabs__panels">
													<div className="konte-size-guide__panel konte-tabs__panel active" data-panel="1">
														<h3 className="konte-size-guide__name">International Sizes</h3>
														<table className="konte-size-guide__table">
															<thead>
																<tr><th>SIZE</th><th>XXS</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>XXL</th></tr>
															</thead>
															<tbody><tr><td>UK</td><td>2</td><td>4</td><td>6</td><td>8</td><td>10</td><td>12</td><td>14</td></tr><tr><td>EU</td><td>30</td><td>32</td><td>34</td><td>36</td><td>38</td><td>40</td><td>42</td></tr><tr><td>US</td><td>00</td><td>0</td><td>2</td><td>4</td><td>6</td><td>8</td><td>10</td></tr><tr><td>FRANCE/SPAIN</td><td>30</td><td>32</td><td>34</td><td>36</td><td>38</td><td>40</td><td>42</td></tr><tr><td>GERMANY</td><td>28</td><td>30</td><td>32</td><td>34</td><td>36</td><td>38</td><td>40</td></tr><tr><td>ITALY</td><td>34</td><td>36</td><td>38</td><td>40</td><td>42</td><td>44</td><td>46</td></tr><tr><td>JAPAN</td><td>1</td><td>3</td><td>5</td><td>7</td><td>9</td><td>11</td><td>13</td></tr><tr><td>KOREA</td><td>33</td><td>44</td><td>55</td><td>66</td><td>77</td><td>88</td><td>99</td></tr></tbody>
														</table>
													</div>
													<div className="konte-size-guide__panel konte-tabs__panel " data-panel="2">
														<h3 className="konte-size-guide__name">Jeans &amp; Trousers Sizes</h3>
														<table className="konte-size-guide__table">
															<thead><tr><th>SIZE</th><th>XXS</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>XXL</th></tr>
															</thead>
															<tbody><tr><td>BUST</td><td>30</td><td>32</td><td>34</td><td>36</td><td>38</td><td>40</td><td>42</td></tr><tr><td>WAIST</td><td>25</td><td>27</td><td>29</td><td>31</td><td>33</td><td>35</td><td>37</td></tr><tr><td>HIPS</td><td>36</td><td>38</td><td>40</td><td>42</td><td>44</td><td>46</td><td>48</td></tr><tr><td>LEG</td><td>32</td><td>34</td><td>36</td><td>38</td><td>40</td><td>42</td><td>44</td></tr></tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
                        </div>
    )

}

export default SizeGuide;