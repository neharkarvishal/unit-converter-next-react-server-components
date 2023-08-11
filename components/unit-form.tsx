'use client';
import { useState } from 'react';

type Unit = 'mm' | 'cm' | 'm' | 'km';
type UnitValue = number | null;

export default function UnitForm({ payload }) {
  let [fromUnit, setFromUnit] = useState<Unit>('m');
  let [fromUnitVal, setFromUnitVal] = useState<UnitValue>(1);

  let [toUnit, setToUnit] = useState<Unit>('cm');
  let [toUnitVal, setToUnitVal] = useState<UnitValue>(100);

  async function updateState(
    frmVal: UnitValue,
    frmUn: Unit,
    toVal: UnitValue,
    toUn: Unit,
  ) {
    return fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ frmVal, frmUn, toVal, toUn }),
    })
      .then(res => res.json())
      .then(res => {
        console.log('state', { fromUnit, toUnit });
        console.log('body', { frmVal, frmUn, toVal, toUn });
        console.log('res', { ...res });

        setFromUnitVal(res.fromUnitVal);
        setFromUnit(res.fromUnit);
        setToUnitVal(res.toUnitVal);
        setToUnit(res.toUnit);
      });
  }

  function changeUnit(type: 'from' | 'to', un: Unit) {
    if (type === 'from') {
      setFromUnit(un);
      updateState(null, un, toUnitVal, toUnit);
    } else {
      setToUnit(un);
      updateState(fromUnitVal, fromUnit, null, un);
    }
  }

  function changeValue(type: 'from' | 'to', val: UnitValue) {
    if (type === 'from') {
      setFromUnitVal(val);
      updateState(val, fromUnit, null, toUnit);
    } else {
      setToUnitVal(val);
      updateState(null, fromUnit, val, toUnit);
    }
  }

  return (
    <div>
      <form id="converter-form">
        <label htmlFor="input-value">From</label>
        <input
          type="number"
          id="input-value"
          required
          value={fromUnitVal}
          onChange={e => {
            changeValue('from', e.target.valueAsNumber);
          }}
        />

        <label htmlFor="from-unit">From Unit</label>
        <select
          id="from-unit"
          required
          value={fromUnit}
          onChange={e => {
            changeUnit('from', e.target.value as Unit);
          }}
        >
          <option value="m">Meters (M)</option>
          <option value="cm">Centimeters (CM)</option>
          <option value="mm">Millimeters (MM)</option>
        </select>

        <br />

        <label htmlFor="output-value">To</label>
        <input
          type="number"
          id="output-value"
          required
          value={toUnitVal}
          onChange={e => {
            changeValue('to', e.target.valueAsNumber);
          }}
        />

        <label htmlFor="to-unit">To Unit</label>
        <select
          id="to-unit"
          required
          value={toUnit}
          onChange={e => {
            changeUnit('to', e.target.value as Unit);
          }}
        >
          <option value="m">Meters (M)</option>
          <option value="cm">Centimeters (CM)</option>
          <option value="mm">Millimeters (MM)</option>
        </select>
      </form>
    </div>
  );
}
