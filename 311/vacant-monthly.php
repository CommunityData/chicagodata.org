<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Vacant/Abandoned Building Reports per Month</title>
    <link rel="icon" href="../css/icons/favicon.ico" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php include '../php/chart-links.php'; ?>
	<style type="text/css">
        #dc-squat-pie {
            width: 100%;
            height: 100%;    
        }
        #dc-fire-pie {
            width: 100%;
            height: 100%;    
        }
	</style>
</head>
<body>
<?php include '../php/header.php'; ?> 
<div class="container-fluid">
	  <div class="container-fluid form-top dash-responsive">
	    <form class="form-inline form-responsive">
          <div class="input-group dropdown">
	        <span class="input-group-addon">311 Data Type</span>
            <select onchange="location = this.options[this.selectedIndex].value;" class="form-control">
             <option value="graffiti-monthly.php">Graffiti</option>
             <option value="potholes-monthly.php">Pot Holes</option>
             <option value="vacant-monthly.php" selected>Vacant/Abandoned Buildings</option>
            </select>
          </div>    
	      <div class="input-group dropdown">
	        <span class="input-group-addon">Community Area</span>
	        <select id="area_select" class="form-control" data-live-search="true" title="Select a Community">	
				<option id="area14"  value="14-Albany Park" selected>Albany Park </option>
				<option id="area57"  value="57-Archer Heights" >Archer Heights </option>
				<option id="area34"  value="34-Armour Square" >Armour Square </option>
				<option id="area70"  value="70-Ashburn" >Ashburn </option>
				<option id="area71"  value="71-Auburn Gresham" >Auburn Gresham </option>
				<option id="area25"  value="25-Austin" >Austin </option>
				<option id="area45"  value="45-Avalon Park" >Avalon Park </option>
				<option id="area21"  value="21-Avondale" >Avondale </option>
				<option id="area19"  value="19-Belmont Cragin" >Belmont Cragin</option>
				<option id="area72"  value="72-Beverly" >Beverly </option>
				<option id="area60"  value="60-Bridgeport" >Bridgeport </option>
				<option id="area58"  value="58-Brighton Park" >Brighton Park </option>
				<option id="area47"  value="47-Burnside" >Burnside </option>
				<option id="area48"  value="48-Calumet Heights" >Calumet Heights </option>
				<option id="area44"  value="44-Chatham" >Chatham </option>
				<option id="area66"  value="66-Chicago Lawn" >Chicago Lawn </option>
				<option id="area64"  value="64-Clearing" >Clearing </option>
				<option id="area35"  value="35-Douglas" >Douglas </option>
				<option id="area17"  value="17-Dunning" >Dunning </option>
				<option id="area27"  value="27-East Garfield Park" >East Garfield Park </option>
				<option id="area52"  value="52-East Side" >East Side </option>
				<option id="area77"  value="77-Edgewater" >Edgewater </option>
				<option id="area9"  value="9-Edison Park" >Edison Park </option>
				<option id="area68"  value="68-Englewood" >Englewood </option>
				<option id="area12"  value="12-Forest Glen" >Forest Glen </option>
				<option id="area37"  value="37-Fuller Park" >Fuller Park </option>
				<option id="area63"  value="63-Gage Park" >Gage Park </option>
				<option id="area56"  value="56-Garfield Ridge" >Garfield Ridge </option>
				<option id="area38"  value="38-Grand Boulevard" >Grand Boulevard </option>
				<option id="area69"  value="69-Greater Grand Crossing" >Greater Grand Crossing </option>
				<option id="area55"  value="55-Hegewisch" >Hegewisch </option>
				<option id="area20"  value="20-Hermosa" >Hermosa </option>
				<option id="area23"  value="23-Humboldt Park" >Humboldt Park </option>
				<option id="area41"  value="41-Hyde Park" >Hyde Park </option>
				<option id="area16"  value="16-Irving Park" >Irving Park </option>
				<option id="area11"  value="11-Jefferson Park" >Jefferson Park </option>
				<option id="area39"  value="39-Kenwood" >Kenwood </option>
				<option id="area6"  value="6-Lake View" >Lake View </option>
				<option id="area7"  value="7-Lincoln Park" >Lincoln Park </option>
				<option id="area4"  value="4-Lincoln Square" >Lincoln Square </option>
				<option id="area22"  value="22-Logan Square" >Logan Square </option>
				<option id="area31"  value="31-Lower West Side" >Lower West Side </option>
				<option id="area59"  value="59-McKinley Park" >McKinley Park </option>
				<option id="area18"  value="18-Montclare" >Montclare </option>
				<option id="area75"  value="75-Morgan Park" >Morgan Park </option>
				<option id="area74"  value="74-Mount Greenwood" >Mount Greenwood </option>
				<option id="area8"  value="8-Near North Side" >Near North Side </option>
				<option id="area33"  value="33-Near South Side" >Near South Side </option>
				<option id="area28"  value="28-Near West Side" >Near West Side </option>
				<option id="area61"  value="61-New City" >New City </option>
				<option id="area5"  value="5-North Center" >North Center </option>
				<option id="area29"  value="29-North Lawndale" >North Lawndale </option>
				<option id="area13"  value="13-North Park" >North Park </option>
				<option id="area10"  value="10-Norwood Park" >Norwood Park </option>
				<option id="area76"  value="76-O'Hare" >O'Hare </option>
				<option id="area36"  value="36-Oakland" >Oakland </option>
				<option id="area15"  value="15-Portage Park" >Portage Park </option>
				<option id="area50"  value="50-Pullman" >Pullman </option>
				<option id="area54"  value="54-Riverdale" >Riverdale </option>
				<option id="area1"  value="1-Rogers Park" >Rogers Park </option>
				<option id="area49"  value="49-Roseland" >Roseland </option>
				<option id="area46"  value="46-South Chicago" >South Chicago </option>
				<option id="area51"  value="51-South Deering" >South Deering </option>
				<option id="area30"  value="30-South Lawndale" >South Lawndale </option>
				<option id="area43"  value="43-South Shore" >South Shore </option>
				<option id="area32"  value="32-The Loop" >The Loop </option>
				<option id="area3"  value="3-Uptown" >Uptown </option>
				<option id="area73"  value="73-Washington Heights" >Washington Heights </option>
				<option id="area40"  value="40-Washington Park" >Washington Park </option>
				<option id="area62"  value="62-West Elsdon" >West Elsdon </option>
				<option id="area67"  value="67-West Englewood" >West Englewood </option>
				<option id="area26"  value="26-West Garfield Park" >West Garfield Park </option>
				<option id="area65"  value="65-West Lawn" >West Lawn </option>
				<option id="area53"  value="53-West Pullman" >West Pullman </option>
				<option id="area2"  value="2-West Ridge" >West Ridge </option>
				<option id="area24"  value="24-West Town" >West Town </option>
				<option id="area42"  value="42-Woodlawn" >Woodlawn </option>
			</select>
	      </div>
            <a href="../311/vacant-map.php" class="btn btn-warning">
		      Vacant Building Maps
            </a>
		</form>  
	  </div>
	  
	 <div class="container-fluid">
	    <div class="row dash-responsive">

	      <div class="col-sm-12">

	        <div class="row">
	          <div class="col-md-8 col-sm-12 col-xs-12 line-chart nopadding">
	            <div class="chart-wrapper">
	              <div class="chart-title-dash">
	                Vacant/Abandoned Building Reports per Month  <span class="chart-title"></span>   
	              </div>
	              <div class="chart-stage">
					  <svg id="dc-line-chart" viewBox="0 0 816 580" 
					       preserveAspectRatio="xMidYMid meet">
					  </svg>
	              </div>
	              <div class="chart-notes">
		  			<div class="info-section">
						<div class="section-line"><b>HIGH:</b><li class="high"></li><b> | LOW:</b><li class="low   "></li><b> | CELERATION (RATE OF CHANGE):</b><li class="celeration"></li></div>
		  			</div>
					<a href="https://data.cityofchicago.org/Service-Requests/311-Service-Requests-Vacant-and-Abandoned-Building/7nii-7srd">Data Source</a> |	<a href="http://communitydataproject.org/issue">Report Issue</a>  
	              </div>
	            </div>
	          </div>
            <div class="col-md-4 col-sm-4 col-xs-6 nopadding">
	            <div class="chart-wrapper">
	              <div class="chart-title-dash">
	                People Using Property Filter   <small><a id="squat">Reset</a></small>
	              </div>
	              <div class="chart-stage capitalize">
					  <svg id="dc-squat-pie" viewBox="-100 0 400 200" 
					       preserveAspectRatio="xMidYMid meet">
					  </svg>
	              </div>
	              <div class="chart-notes">
	                Select true or false to filter
	              </div>
	            </div>
	       </div>    
	          <div class="col-md-4 col-sm-4 col-xs-6 nopadding">
	            <div class="chart-wrapper">
	              <div class="chart-title-dash">
	                Vacant Due To Fire Filter  <small><a id="fire">Reset</a></small>
	              </div>
	              <div class="chart-stage capitalize">
					  <svg id="dc-fire-pie" viewBox="-100 0 400 200"
					       preserveAspectRatio="xMidYMid meet">
					  </svg>
	              </div>
	              <div class="chart-notes">
	                Select true or false to filter
	              </div>
	            </div>
	          </div>
            </div>    
			<div class="col-md-4 col-sm-12 col-xs-12 spacer">	
		 	</div>	 
           </div>        
          </div>
       </div>
</div>
    <?php include '../php/footer.php'; ?> 
    <?php include '../php/chart-scripts.php'; ?> 
    <script type="text/javascript" src="js/vacant.monthly.js"></script>

</body>
</html>