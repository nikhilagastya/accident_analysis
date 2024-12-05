import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { useAccidentStore } from '../store/accidentStore';
import { Modal } from './Modal';
import type { AccidentData } from '../types';

const VEHICLE_TYPES = ['2-Wheeler', '4-Wheeler', 'Heavy Vehicle'];
const ENVIRONMENTAL_CONDITIONS = [
  'pavement slippery',
  'glare',
  'obstruction/debris',
  'pavement defective',
  'view obstructed',
  'outside car distraction'
];
const columnMappings = {
  crashes: [
    { label: "Crash Date", key: "crashDate" },
    { label: "Crash Time", key: "crashTime" },
    { label: "Borough", key: "borough" },
    { label: "Zip Code", key: "zipCode" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Location", key: "location" },
    { label: "On Street Name", key: "onStreetName" },
    { label: "Cross Street Name", key: "crossStreetName" },
    { label: "Off Street Name", key: "offStreetName" },
    { label: "Number of Persons Injured", key: "numberOfPersonsInjured" },
    { label: "Number of Persons Killed", key: "numberOfPersonsKilled" },
    { label: "Number of Pedestrians Injured", key: "numberOfPedestriansInjured" },
    { label: "Number of Pedestrians Killed", key: "numberOfPedestriansKilled" },
    { label: "Number of Cyclists Injured", key: "numberOfCyclistsInjured" },
    { label: "Number of Cyclists Killed", key: "numberOfCyclistsKilled" },
    { label: "Number of Motorists Injured", key: "numberOfMotoristsInjured" },
    { label: "Number of Motorists Killed", key: "numberOfMotoristsKilled" },
    { label: "Contributing Factor Vehicle 1", key: "contributingFactorVehicle1" },
    { label: "Contributing Factor Vehicle 2", key: "contributingFactorVehicle2" },
    { label: "Contributing Factor Vehicle 3", key: "contributingFactorVehicle3" },
    { label: "Contributing Factor Vehicle 4", key: "contributingFactorVehicle4" },
    { label: "Contributing Factor Vehicle 5", key: "contributingFactorVehicle5" },
    { label: "Collision ID", key: "collisionId" },
    { label: "Vehicle Type Code 1", key: "vehicleTypeCode1" },
    { label: "Vehicle Type Code 2", key: "vehicleTypeCode2" },
    { label: "Vehicle Type Code 3", key: "vehicleTypeCode3" },
    { label: "Vehicle Type Code 4", key: "vehicleTypeCode4" },
    { label: "Vehicle Type Code 5", key: "vehicleTypeCode5" },
  ],
  person: [
    { label: "Unique ID", key: "uniqueId" },
    { label: "Collision ID", key: "collisionId" },
    { label: "Crash Date", key: "crashDate" },
    { label: "Crash Time", key: "crashTime" },
    { label: "Person ID", key: "personId" },
    { label: "Person Type", key: "personType" },
    { label: "Person Injury", key: "personInjury" },
    { label: "Vehicle ID", key: "vehicleId" },
    { label: "Person Age", key: "personAge" },
    { label: "Ejection", key: "ejection" },
    { label: "Emotional Status", key: "emotionalStatus" },
    { label: "Bodily Injury", key: "bodilyInjury" },
    { label: "Position in Vehicle", key: "positionInVehicle" },
    { label: "Safety Equipment", key: "safetyEquipment" },
    { label: "Pedestrian Location", key: "pedLocation" },
    { label: "Pedestrian Action", key: "pedAction" },
    { label: "Complaint", key: "complaint" },
    { label: "Pedestrian Role", key: "pedRole" },
    { label: "Contributing Factor 1", key: "contributingFactor1" },
    { label: "Contributing Factor 2", key: "contributingFactor2" },
    { label: "Person Sex", key: "personSex" },
  ],
  vehicle: [
    { label: "Unique ID", key: "uniqueId" },
    { label: "Collision ID", key: "collisionId" },
    { label: "Crash Date", key: "crashDate" },
    { label: "Crash Time", key: "crashTime" },
    { label: "Vehicle ID", key: "vehicleId" },
    { label: "State Registration", key: "stateRegistration" },
    { label: "Vehicle Type", key: "vehicleType" },
    { label: "Vehicle Make", key: "vehicleMake" },
    { label: "Vehicle Model", key: "vehicleModel" },
    { label: "Vehicle Year", key: "vehicleYear" },
    { label: "Travel Direction", key: "travelDirection" },
    { label: "Vehicle Occupants", key: "vehicleOccupants" },
    { label: "Driver Sex", key: "driverSex" },
    { label: "Driver License Status", key: "driverLicenseStatus" },
    { label: "Driver License Jurisdiction", key: "driverLicenseJurisdiction" },
    { label: "Pre-Crash", key: "preCrash" },
    { label: "Point of Impact", key: "pointOfImpact" },
    { label: "Vehicle Damage", key: "vehicleDamage" },
    { label: "Vehicle Damage 1", key: "vehicleDamage1" },
    { label: "Vehicle Damage 2", key: "vehicleDamage2" },
    { label: "Vehicle Damage 3", key: "vehicleDamage3" },
    { label: "Public Property Damage", key: "publicPropertyDamage" },
    { label: "Public Property Damage Type", key: "publicPropertyDamageType" },
    { label: "Contributing Factor 1", key: "contributingFactor1" },
    { label: "Contributing Factor 2", key: "contributingFactor2" },
  ],
};
export const DataManagement: React.FC = () => {
  const { accidents, addAccident, updateAccident, removeAccident } = useAccidentStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("crashes");

  const [editingAccident, setEditingAccident] = useState<AccidentData | null>(null);
  const [filters, setFilters] = useState({
    vehicleType: '',
    environmentalCondition: '',
    dateFrom: '',
    dateTo: '',
  });

  const itemsPerPage = 10;

  const filteredData = accidents.filter((accident) => {
    const matchesSearch = Object.values(accident).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesVehicleType = filters.vehicleType
      ? accident.vehicleType === filters.vehicleType
      : true;

    const matchesEnvironmental = filters.environmentalCondition
      ? accident.environmentalCondition === filters.environmentalCondition
      : true;

    const matchesDateRange = (!filters.dateFrom || accident.date >= filters.dateFrom) &&
      (!filters.dateTo || accident.date <= filters.dateTo);

    return matchesSearch && matchesVehicleType && matchesEnvironmental && matchesDateRange;
  });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      removeAccident(id);
    }
  };

  const handleEdit = (accident: AccidentData) => {
    setEditingAccident(accident);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (formData: Partial<AccidentData>) => {
    if (editingAccident) {
      updateAccident(editingAccident.id, { ...editingAccident, ...formData } as AccidentData);
    } else {
      addAccident({
        id: Date.now().toString(),
        ...formData,
      } as AccidentData);
    }
    setIsAddModalOpen(false);
    setEditingAccident(null);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search records..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <select
              className="bg-gray-700 text-white rounded-lg p-2"
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
            >

              <option value="crashes">Crashes</option>
              <option value="vehicles">Vehicles</option>
              <option value="people">People</option>
              {/* Add more options here as needed */}
            </select>
          </div>

          <button
            onClick={() => {
              setEditingAccident(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add New
          </button>
        </div>


      </div>

      {/* Data Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead className="bg-gray-700">
              <tr>

                {columnMappings[selectedTable].map((col) => (

                  <th className="p-4 text-left">{col.label}</th>
                ))}
                <th className="p-4 text-left">Vehicle Type</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Environmental Condition</th>
                <th className="p-4 text-left">Deaths</th>
                <th className="p-4 text-left">Injuries</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((accident) => (
                <tr key={accident.id} className="border-b border-gray-700 hover:bg-gray-700/50">

                  {columnMappings[selectedTable].map((row) => (

                    <td className="p-4">{accident[row.key]}</td>
                  ))}

                  <td className="p-4">
                    <div className="flex ">
                      <button
                        onClick={() => handleEdit(accident)}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <Pencil className="h-4 w-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDelete(accident.id)}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center bg-gray-700">
          <span className="text-gray-300">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
            {filteredData.length} entries
          </span>
          <div className="flex gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {/* <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingAccident(null);
        }}
        title={editingAccident ? 'Edit Accident Record' : 'Add New Accident Record'}
      >
        <AccidentForm
          initialData={editingAccident}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsAddModalOpen(false);
            setEditingAccident(null);
          }}
        />
      </Modal> */}
    </div>
  );
};

interface AccidentFormProps {
  initialData?: AccidentData | null;
  onSubmit: (data: Partial<AccidentData>) => void;
  onCancel: () => void;
}

const AccidentForm: React.FC<AccidentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<AccidentData>>(
    initialData || {
      date: '',
      vehicleType: '',
      location: { latitude: 0, longitude: 0 },
      deaths: 0,
      injuries: 0,
      environmentalCondition: '',
      contributingFactor: '',
      gender: 'male',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
          <input
            type="date"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Type</label>
          <select
            className="w-full bg-gray-700 text-white rounded p-2"
            value={formData.vehicleType}
            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
            required
          >
            <option value="">Select Type</option>
            {VEHICLE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Latitude</label>
          <input
            type="number"
            step="0.000001"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={formData.location?.latitude}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location!, latitude: Number(e.target.value) },
              })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Longitude</label>
          <input
            type="number"
            step="0.000001"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={formData.location?.longitude}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: { ...formData.location!, longitude: Number(e.target.value) },
              })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Deaths</label>
          <input
            type="number"
            min="0"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={formData.deaths}
            onChange={(e) => setFormData({ ...formData, deaths: Number(e.target.value) })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Injuries</label>
          <input
            type="number"
            min="0"
            className="w-full bg-gray-700 text-white rounded p-2"
            value={formData.injuries}
            onChange={(e) => setFormData({ ...formData, injuries: Number(e.target.value) })}
            required
          />

        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Environmental Condition
          </label>
          <select
            className="w-full bg-gray-700 text-white rounded p-2"
            value={formData.environmentalCondition}
            onChange={(e) =>
              setFormData({ ...formData, environmentalCondition: e.target.value })
            }
            required
          >
            <option value="">Select Condition</option>
            {ENVIRONMENTAL_CONDITIONS.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
          <select
            className="w-full bg-gray-700 text-white rounded p-2"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })
            }
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-300 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Add'} Record
        </button>
      </div>
    </form>
  );
};