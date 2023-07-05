export const convertDate = (date) => {
    const d = new Date(date);
    return (
      <span>
        {d.getUTCMonth() + 1}/{d.getDate()}/{d.getUTCFullYear()}
      </span>
    );
  };