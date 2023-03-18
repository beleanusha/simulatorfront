import React, { useState } from 'react';
import { toast } from 'react-toastify';

function ProjectParameterForm() {
  const [mudDensity, setMudDensity] = useState(9.5);
  const [maxWOB, setMaxWOB] = useState(90000);
  const [rpm, setRpm] = useState(100);
  const [personnelCost, setPersonnelCost] = useState(10000);
  const [bhaCost, setBhaCost] = useState(25000);
  const [onshoreRigCost, setOnshoreRigCost] = useState(10000);
  const [offshoreRigCost, setOffshoreRigCost] = useState(100000);
  const [avgMudCost, setAvgMudCost] = useState(12);
  const [tripInSpeed, setTripInSpeed] = useState(36000);
  const [tripOutSpeed, setTripOutSpeed] = useState(21600);
  const [casingSpeed, setCasingSpeed] = useState(3140);
  const [verticalDiameter, setVerticalDiameter] = useState(12.25);
  const [buildDiameter, setBuildDiameter] = useState(10.5);
  const [lateralDiameter, setLateralDiameter] = useState(9.25);
  const [rockFormationHardness, setRockFormationHardness] = useState('100-250 Mpa');
  const [casingCostVertical, setCasingCostVertical] = useState(12);
  const [casingCostBuild, setCasingCostBuild] = useState(10);
  const [casingCostLateral, setCasingCostLateral] = useState(9);
  const [cementingCost, setCementingCost] = useState(12);
  const [drillBitCost, setDrillBitCost] = useState(2500);
  const [bhaCost2, setBhaCost2] = useState(40000);
  const [maxRopVertical, setMaxRopVertical] = useState(200);
  const [maxRopBuild, setMaxRopBuild] = useState(150);
  const [maxRopLateral, setMaxRopLateral] = useState(100);
  const [drillPipeOD, setDrillPipeOD] = useState(5);

  const handleSubmit = (event) => {
    toast.info("Request Submitted.....")
    event.preventDefault();
    // Handle form submission
    console.log({
      mudDensity,
      maxWOB,
      rpm,
      personnelCost,
      bhaCost,
      onshoreRigCost,
      offshoreRigCost,
      avgMudCost,
      tripInSpeed,
      tripOutSpeed,
      casingSpeed,
      verticalDiameter,
      buildDiameter,
      lateralDiameter,
      rockFormationHardness,
      casingCostVertical,
      casingCostBuild,
      casingCostLateral,
      cementingCost,
      drillBitCost,
      bhaCost2,
      maxRopVertical,
      maxRopBuild,
      maxRopLateral,
      drillPipeOD,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-light row">
    <label className="form-label col-4">
      Mud density:
      <input type="number" value={mudDensity} onChange={(e) => setMudDensity(e.target.value)} className="form-control" />
    </label>
    <br />
    <label className="form-label col-4">
      Max WOB:
      <input type="number" value={maxWOB} onChange={(e) => setMaxWOB(e.target.value)} className="form-control" />
    </label>
    <br />
    <label className="form-label col-4">
      RPM:
      <input type="number" value={rpm} onChange={(e) => setRpm(e.target.value)} className="form-control" />
    </label>
    <br />
    <label className="form-label col-4">
      Personnel cost per day:
      <input type="number" value={personnelCost} onChange={(e) => setPersonnelCost(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        BHA cost per day:
        <input type="number" value={bhaCost} onChange={(e) => setBhaCost(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Rig cost per day for on-shore:
        <input type="number" value={onshoreRigCost} onChange={(e) => setOnshoreRigCost(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Rig cost per day for off-shore:
        <input type="number" value={offshoreRigCost} onChange={(e) => setOffshoreRigCost(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Avg. Mud cost:
        <input type="number" value={avgMudCost} onChange={(e) => setAvgMudCost(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Trip in speed:
        <input type="number" value={tripInSpeed} onChange={(e) => setTripInSpeed(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Trip out speed:
        <input type="number" value={tripOutSpeed} onChange={(e) => setTripOutSpeed(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Casing speed:
        <input type="number" value={casingSpeed} onChange={(e) => setCasingSpeed(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Diameter of the vertical section:
        <input type="number" value={verticalDiameter} onChange={(e) => setVerticalDiameter(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Diameter of the build section:
        <input type="number" value={buildDiameter} onChange={(e) => setBuildDiameter(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Diameter of lateral section:
        <input type="number" value={lateralDiameter} onChange={(e) => setLateralDiameter(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Rock formation hardness range:
        <input type="text" value={rockFormationHardness} onChange={(e) => setRockFormationHardness(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Casing cost for vertical:
        <input type="number" value={casingCostVertical} onChange={(e) => setCasingCostVertical(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Casing cost for build section:
        <input type="number" value={casingCostBuild} onChange={(e) => setCasingCostBuild(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Casing cost for lateral section:
        <input type="number" value={casingCostLateral} onChange={(e) => setCasingCostLateral(e.target.value)} className="form-control" />
      </label>
      <label className="form-label col-4">
        Cementing cost:
        <input type="number" value={cementingCost} onChange={(e) => setCementingCost(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Drill bit cost:
        <input type="number" value={drillBitCost} onChange={(e) => setDrillBitCost(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        BHA cost:
        <input type="number" value={bhaCost2} onChange={(e) => setBhaCost2(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Max ROP for vertical section:
        <input type="number" value={maxRopVertical} onChange={(e) => setMaxRopVertical(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Max ROP for build section:
        <input type="number" value={maxRopBuild} onChange={(e) => setMaxRopBuild(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Max ROP for lateral section:
        <input type="number" value={maxRopLateral} onChange={(e) => setMaxRopLateral(e.target.value)} className="form-control" />
      </label>
      <br />
      <label className="form-label col-4">
        Drill pipe OD:
        <input type="number" value={drillPipeOD} onChange={(e) => setDrillPipeOD(e.target.value)} className="form-control" />
      </label>
      <br />
      <button type="submit" className="btn btn-primary">Calculate</button>
    </form>
  );
}

      


  export default ProjectParameterForm;