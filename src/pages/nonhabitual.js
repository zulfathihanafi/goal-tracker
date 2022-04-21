import "../styles/nonhabitual.css"

const Nonhabitual = () => {
    return (
        <div>
            <main class="pageLayout">
                <div class="container">
                    <h1 className='boxtitle textheader' style={{ textAlign: 'center' }}>
                        Programming Project
                    </h1>
                    <br></br>

            Progress : 
                    <div class="progress">
                        
                        
                        <div class="progress-bar bg-success" role="progressbar" style={{ width: 200 }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">25%</div>
                    </div>

                    <br></br>

                    {/*list of activities*/}

                    <div className='boxactivity'>
                        <div class="row row-cols-10" >
                            <div class="col-10" > <h4 className='textheader'>Activities</h4></div>

                            <div class="col text-center"><h4 className='textheader'>Deadline</h4></div>

                            <ul>
                                <li class="form-check col-10">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        design prototype

                                        {/* <div class="col-2" className='date' style={{float:'right'}}> 
              21/2/2022
              {/* <input type="date"/>           
              </div> */}
                                    </label>


                                </li>
                                {/* <div class="col-2" className='date' style={{float:'right'}}>20/2/2022</div> */}


                                <li class="form-check col-10">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        submit design
                                        {/**  <div class="col-2 text-right" style={{float:'right'}}>
              <input type="date"/>           
              </div> */}
                                    </label>
                                </li>

                                <li class="form-check col-10">
                                    <input class="form-check-input" type="checkbox" value="" />
                                    <input class="form-control form-control-sm border-0 " type="text" placeholder="add activity" />
                                    {/**  <div class="col-2 text-center" style={{float:'right'}}>
              <input type="date"/></div> */}
                                </li>


                            </ul>

                        </div>


                        <br></br>
                        <hr></hr>
                        <br></br>

                        {/*activity that has been done*/}

                        <div class="form-check col-10">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                            <label class="form-check-label" for="flexCheckDefault">
                                <del>find groupmates</del>
                            </label>
                        </div>

                        <div class="form-check col-10">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                            <label class="form-check-label" for="flexCheckDefault">
                                <del>receive task</del>
                            </label>
                        </div>

                        <div class="form-check col-10">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                            <label class="form-check-label" for="flexCheckDefault">
                                <del>assign task</del>
                            </label>
                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Nonhabitual;