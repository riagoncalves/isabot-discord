import React from 'react';

const CommandsTable = (props) => {

  const handleDelete = (commandId) => {
    fetch(`/commands/${commandId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if(data.success == true) return window.location.assign('/commands');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className={`${props.title} shinobu-commands-list-item flex flex-col flex-wrap justify-center items-center`}>
      <h2 className="title-white title-sm">{props.title}</h2>
      <div className="flex justify-center items-center flex-wrap">
        {props.rows.map((row) => {
          return (
            <div className="shinobu-commands-card" key={row.id}>
              <p className="info-sl info-white tal">{row.name}</p>
              <p className="info-xsl info-white tal">{row.description}</p>
              <div className="shinobu-commands-card-info">
                <p className="info-xsl info-gray tal"><span className="info-bold info-white">Usage:</span> {row.usage}</p>
                <p className="info-xsl info-gray tal"><span className="info-bold info-white">Aliases:</span> {row.aliases.join(', ')}</p>
              </div>
              {props.user && props.user.userID == process.env.ownerID &&
                <div className="info-xsl info-gray flex shinobu-commands-card-links">
                  <a href={`/commands/${row.id}/edit`} className="info-white info-xsl">Edit</a>
                  <a href='#' onClick={(e) => {
                    e.preventDefault();
                    handleDelete(row.id);
                  }} className="info-white info-xsl">Delete</a>
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommandsTable;
