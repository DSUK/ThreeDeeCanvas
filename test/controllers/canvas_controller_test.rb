require 'test_helper'

class CanvasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @canva = canvas(:one)
  end

  test "should get index" do
    get canvas_url
    assert_response :success
  end

  test "should get new" do
    get new_canva_url
    assert_response :success
  end

  test "should create canva" do
    assert_difference('Canva.count') do
      post canvas_url, params: { canva: {  } }
    end

    assert_redirected_to canva_url(Canva.last)
  end

  test "should show canva" do
    get canva_url(@canva)
    assert_response :success
  end

  test "should get edit" do
    get edit_canva_url(@canva)
    assert_response :success
  end

  test "should update canva" do
    patch canva_url(@canva), params: { canva: {  } }
    assert_redirected_to canva_url(@canva)
  end

  test "should destroy canva" do
    assert_difference('Canva.count', -1) do
      delete canva_url(@canva)
    end

    assert_redirected_to canvas_url
  end
end
