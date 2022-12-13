import partyFetch from "../axios/config";

import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import useToast from "../../hooks/useToast";

import "./Form.css";

const EditParty = () => {
  const { id } = useParams();

  const [party, setParty] = useState(null);

  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  // Load services and party
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");

      setServices(res.data);

      loadParty();
    };

    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);

      setParty(res.data);
    };

    loadServices();
  }, []);

  // Add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);

    let partyServices = party.services;

    if (checked) {
      partyServices = [...partyServices, filteredService[0]];
    } else {
      partyServices = partyServices.filter((s) => s._id !== value);
    }

    console.log(partyServices);

    setParty({ ...party, services: partyServices });
  };

  // Send a update HTTP request
  const updateParty = async (e) => {
    e.preventDefault();

    try {
      const res = await partyFetch.put(`/parties/${party._id}`, party);

      console.log(res.data.msg);

      if (res.status === 200) {
        navigate(`/party/${id}`);

        useToast(res.data.msg);
      }
    } catch (err) {
      useToast(err.response.data.msg, "error");
    }
  };

  if (!party) return <p>Carregando...</p>;

  return (
    <div className="form-page">
      <h2>Crie sua próxima Festa</h2>
      <p>Ajuste as informações da sua festa</p>
      <form onSubmit={(e) => updateParty(e)}>
        <label>
          <span>Nome da festa:</span>
          <input
            type="text"
            placeholder="Seja criativo..."
            onChange={(e) => setParty({ ...party, title: e.target.value })}
            value={party.title}
            required
          />
        </label>
        <label>
          <span>Anfitrião:</span>
          <input
            type="text"
            placeholder="Quem está dando a festa?"
            onChange={(e) => setParty({ ...party, author: e.target.value })}
            value={party.author}
            required
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            placeholder="Conte mais sobre a festa..."
            onChange={(e) =>
              setParty({ ...party, description: e.target.value })
            }
            value={party.description}
            required
          ></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input
            type="number"
            placeholder="Quanto você pretende investir?"
            onChange={(e) => setParty({ ...party, budget: e.target.value })}
            value={party.budget}
            required
          />
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type="text"
            placeholder="Insira a URL de uma imagem"
            onChange={(e) => setParty({ ...party, image: e.target.value })}
            value={party.image}
            required
          />
        </label>
        <div>
          <h2>Escolha os serviços:</h2>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 &&
              services.map((service) => (
                <div className="service" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">R${service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={(e) => handleServices(e)}
                      checked={
                        party.services.find(
                          (partyService) => partyService._id === service._id
                        ) || ""
                      }
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Editar Festa" className="btn" />
      </form>
    </div>
  );
};

export default EditParty;
