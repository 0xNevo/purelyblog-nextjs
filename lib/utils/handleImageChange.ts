const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPreview: (preview: string) => void
) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

export default handleImageChange;
