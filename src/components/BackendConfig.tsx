import { useState } from 'react';
import './BackendConfig.css';

interface BackendConfigProps {
  backendUrl: string;
  onBackendUrlChange: (url: string) => void;
}

export const BackendConfig: React.FC<BackendConfigProps> = ({
  backendUrl,
  onBackendUrlChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(backendUrl);

  const handleSave = () => {
    onBackendUrlChange(tempUrl);
    setIsEditing(false);
  };

  return (
    <div className="backend-config">
      <label className="backend-config-label">URL del Backend:</label>
      {isEditing ? (
        <div className="backend-config-edit">
          <input
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            className="backend-config-input"
            placeholder="http://localhost:3000"
          />
          <button onClick={handleSave} className="backend-config-btn-save">
            Guardar
          </button>
        </div>
      ) : (
        <div className="backend-config-display">
          <span className="backend-config-url">{backendUrl}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="backend-config-btn-edit"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};
