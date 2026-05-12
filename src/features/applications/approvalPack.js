export const APPROVAL_DOCUMENTS = [
  {
    id: "identityDocument",
    label: "ID document",
    description: "South African ID, passport, or accepted identity document."
  },
  {
    id: "proofOfResidence",
    label: "Proof of residence",
    description: "Municipal bill, lease letter, bank letter, or verified address document."
  },
  {
    id: "proofOfIncome",
    label: "Proof of income",
    description: "Previous landlord, employer, or trusted rental reference."
  },
  {
    id: "bankStatement",
    label: "Bank statement",
    description: "Recent statement used for affordability and approval checks."
  }
];

export const emptyApprovalPack = () =>
  APPROVAL_DOCUMENTS.reduce((pack, document) => ({
    ...pack,
    [document.id]: null
  }), {});

export const fileToDocumentMeta = (file) => {
  if (!file) return null;
  return {
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream"
  };
};

export const getMissingApprovalDocuments = (approvalPack) =>
  APPROVAL_DOCUMENTS.filter((document) => !approvalPack[document.id]);

export const isApprovalPackComplete = (approvalPack) =>
  getMissingApprovalDocuments(approvalPack).length === 0;
