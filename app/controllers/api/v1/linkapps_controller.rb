module Api
  module V1
    class LinkappsController < ApplicationController
      protect_from_forgery with: :null_session

      before_action :linkapp, only: %i[show edit update destroy]

      # GET /linkapps or /linkapps.json
      def index
        @linkapps = Linkapp.all
        render json: LinkappSerializer.new(@linkapps).to_json
      end

      # GET /linkapps/1 or /linkapps/1.json
      def show
        render json: LinkappSerializer.new(@linkapp).to_json
      end

      # POST /linkapps or /linkapps.json
      def create
        @linkapp = Linkapp.new(linkapp_params)

        if @linkapp.save
          render json: LinkappSerializer.new(@linkapp).to_json, status: :created
        else
          render json: { error: @linkapp.errors.messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /linkapps/1 or /linkapps/1.json
      def update
        if @linkapp.update(linkapp_params)
          render json: LinkappSerializer.new(@linkapp).to_json
        else
          render json: { error: @linkapp.errors.messages }, status: :unprocessable_entity
        end
      end

      # DELETE /linkapps/1 or /linkapps/1.json
      def destroy
        @linkapp.destroy
        head :no_content
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def linkapp
        @linkapp ||= Linkapp.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def linkapp_params
        params.require(:linkapp).permit(:name, :hyperlink, :description)
      end
    end
  end
end
