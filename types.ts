
export interface OrgNodeData {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  color?: string;
  isExpanded: boolean;
  children: OrgNodeData[];
}
