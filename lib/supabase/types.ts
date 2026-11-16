import type { PropertyRow } from "@/lib/findmyhome/properties";

type PropertyInsert = Omit<PropertyRow, "id" | "created_at" | "updated_at"> &
  Partial<Pick<PropertyRow, "id" | "created_at" | "updated_at">>;

type PropertyUpdate = Partial<
  Omit<PropertyRow, "id" | "owner_id" | "created_at" | "updated_at">
>;

type ViewingRequestRow = {
  id: string;
  property_id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type FindMyHomeDatabase = {
  public: {
    Tables: {
      properties: {
        Row: PropertyRow;
        Insert: PropertyInsert;
        Update: PropertyUpdate;
        Relationships: [];
      };
      property_viewing_requests: {
        Row: ViewingRequestRow;
        Insert: {
          id?: string;
          property_id: string;
          name: string;
          email: string;
          message?: string;
          created_at?: string;
        };
        Update: Partial<Omit<ViewingRequestRow, "id" | "created_at">>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
