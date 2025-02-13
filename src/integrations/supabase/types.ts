export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      building_age_classes: {
        Row: {
          load_kw: number
          load_w: number
          year: number
        }
        Insert: {
          load_kw: number
          load_w: number
          year: number
        }
        Update: {
          load_kw?: number
          load_w?: number
          year?: number
        }
        Relationships: []
      }
      climate_data: {
        Row: {
          altitude: number
          average_temperature: number
          city: string
          design_temperature: number
          notes: string | null
          postal_code: string
          try_region: number
        }
        Insert: {
          altitude: number
          average_temperature: number
          city: string
          design_temperature: number
          notes?: string | null
          postal_code: string
          try_region: number
        }
        Update: {
          altitude?: number
          average_temperature?: number
          city?: string
          design_temperature?: number
          notes?: string | null
          postal_code?: string
          try_region?: number
        }
        Relationships: []
      }
      heat_pump_requests: {
        Row: {
          additional_costs: string | null
          additional_heat_source: string | null
          additional_heat_source_support: string | null
          additional_heat_source_type: string | null
          birth_date: string | null
          boiler_type: string | null
          building_permit_date: string | null
          construction_year: string | null
          created_at: string
          distance_to_building: string | null
          distance_to_heating_room: string | null
          facade_insulated: string | null
          first_name: string
          fuel_consumption: string | null
          fuel_type: string | null
          fundable_area: string | null
          fundable_units: string | null
          ground_material: string | null
          heating_install_year: string | null
          heating_load: Json | null
          heating_location: string | null
          heating_power: string | null
          heating_room_height: string | null
          household_persons: string | null
          id: string
          installation_type: string | null
          internal_id: string | null
          is_owner: string | null
          last_name: string
          living_area: string | null
          mixed_circuits: string | null
          narrowest_passage: string | null
          postal_code: string
          roof_insulated: string | null
          tariff_module: string | null
          unmixed_circuits: string | null
          user_id: string
          water_comfort: string | null
          water_heating_type: string | null
          water_tank_size: string | null
          windows_insulated: string | null
        }
        Insert: {
          additional_costs?: string | null
          additional_heat_source?: string | null
          additional_heat_source_support?: string | null
          additional_heat_source_type?: string | null
          birth_date?: string | null
          boiler_type?: string | null
          building_permit_date?: string | null
          construction_year?: string | null
          created_at?: string
          distance_to_building?: string | null
          distance_to_heating_room?: string | null
          facade_insulated?: string | null
          first_name: string
          fuel_consumption?: string | null
          fuel_type?: string | null
          fundable_area?: string | null
          fundable_units?: string | null
          ground_material?: string | null
          heating_install_year?: string | null
          heating_load?: Json | null
          heating_location?: string | null
          heating_power?: string | null
          heating_room_height?: string | null
          household_persons?: string | null
          id?: string
          installation_type?: string | null
          internal_id?: string | null
          is_owner?: string | null
          last_name: string
          living_area?: string | null
          mixed_circuits?: string | null
          narrowest_passage?: string | null
          postal_code: string
          roof_insulated?: string | null
          tariff_module?: string | null
          unmixed_circuits?: string | null
          user_id: string
          water_comfort?: string | null
          water_heating_type?: string | null
          water_tank_size?: string | null
          windows_insulated?: string | null
        }
        Update: {
          additional_costs?: string | null
          additional_heat_source?: string | null
          additional_heat_source_support?: string | null
          additional_heat_source_type?: string | null
          birth_date?: string | null
          boiler_type?: string | null
          building_permit_date?: string | null
          construction_year?: string | null
          created_at?: string
          distance_to_building?: string | null
          distance_to_heating_room?: string | null
          facade_insulated?: string | null
          first_name?: string
          fuel_consumption?: string | null
          fuel_type?: string | null
          fundable_area?: string | null
          fundable_units?: string | null
          ground_material?: string | null
          heating_install_year?: string | null
          heating_load?: Json | null
          heating_location?: string | null
          heating_power?: string | null
          heating_room_height?: string | null
          household_persons?: string | null
          id?: string
          installation_type?: string | null
          internal_id?: string | null
          is_owner?: string | null
          last_name?: string
          living_area?: string | null
          mixed_circuits?: string | null
          narrowest_passage?: string | null
          postal_code?: string
          roof_insulated?: string | null
          tariff_module?: string | null
          unmixed_circuits?: string | null
          user_id?: string
          water_comfort?: string | null
          water_heating_type?: string | null
          water_tank_size?: string | null
          windows_insulated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_heat_pump_requests_climate_data"
            columns: ["postal_code"]
            isOneToOne: false
            referencedRelation: "climate_data"
            referencedColumns: ["postal_code"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
