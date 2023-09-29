function FilterChangedFields(
  newData: Record<string, any>,
  oldData: Record<string, any>
): Record<string, any> {
  const changedFields: Record<string, any> = {};

  for (const key in newData) {
    if (newData.hasOwnProperty(key) && oldData.hasOwnProperty(key)) {
      if (newData[key] !== oldData[key]) {
        changedFields[key] = newData[key];
      }
    }
  }

  return changedFields;
}

export default FilterChangedFields;
