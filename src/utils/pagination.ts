export const paginate = async (
  model: any,
  query: any,
  page: number = 1,
  limit: number = 10,
  sortField: string = "name",
  sortOrder: number = 1
) => {
  const skip = (page - 1) * limit;

  const docs = await model
    .find(query)
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(limit);

  const totalDocs = await model.countDocuments(query);
  const totalPages = Math.ceil(totalDocs / limit);

  return {
    docs: docs || [],        
    totalDocs: totalDocs || 0,
    totalPages: totalPages || 0,
    page,
    limit,
  };
};
