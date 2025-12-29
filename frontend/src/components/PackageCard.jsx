import React from "react";

const PackageCard = ({ packageData }) => {
  const { title, description, price, duration, location, availableSlots, image } = packageData || {};

  return (
    <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 6 }}>
      <img
        src={image || "https://via.placeholder.com/300x160"}
        alt={title}
        style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 4 }}
      />
      <h3 style={{ margin: "8px 0" }}>{title}</h3>
      <p style={{ margin: "6px 0", color: "#555" }}>{description}</p>
      <p style={{ margin: "6px 0" }}>
        <strong>Price:</strong> ${price} • <strong>Duration:</strong> {duration}
      </p>
      <p style={{ margin: "6px 0", fontSize: 14, color: "#666" }}>
        <strong>Location:</strong> {location} • <strong>Slots:</strong> {availableSlots}
      </p>
      <div style={{ marginTop: 8 }}>
        <button disabled style={{ padding: "8px 12px", background: "#1e90ff", color: "white", border: "none", borderRadius: 4 }}>
          Book Now (UI-only)
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
