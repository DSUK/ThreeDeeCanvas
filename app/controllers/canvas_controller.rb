class CanvasController < ApplicationController
  before_action :set_canva, only: [:show, :edit, :update, :destroy]

  # GET /canvas
  # GET /canvas.json
  def index
    @canvas = Canva.all
  end

  # GET /canvas/1
  # GET /canvas/1.json
  def show
  end

  # GET /canvas/new
  def new
    @canva = Canva.new
  end

  # GET /canvas/1/edit
  def edit
  end

  # POST /canvas
  # POST /canvas.json
  def create
    @canva = Canva.new(canva_params)

    respond_to do |format|
      if @canva.save
        format.html { redirect_to Canva, notice: 'Canva was successfully created.' }
        format.json { render :show, status: :created, location: @canva }
      else
        format.html { render :new }
        format.json { render json: @canva.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /canvas/1
  # PATCH/PUT /canvas/1.json
  def update
    respond_to do |format|
      if @canva.update(canva_params)
        format.html { redirect_to @canva, notice: 'Canva was successfully updated.' }
        format.json { render :show, status: :ok, location: @canva }
      else
        format.html { render :edit }
        format.json { render json: @canva.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /canvas/1
  # DELETE /canvas/1.json
  def destroy
    @canva.destroy
    respond_to do |format|
      format.html { redirect_to canvas_url, notice: 'Canva was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_canva
      @canva = Canva.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def canva_params
      params.fetch(:canva, {}).permit(:name)
    end
end
