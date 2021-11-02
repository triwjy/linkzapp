require 'test_helper'

class LinkappsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @linkapp = linkapps(:one)
  end

  test 'should show linkapps' do
    get api_v1_linkapps_url, as: :json
    assert_response :success
  end

  test 'should show linkapp' do
    get api_v1_linkapp_url(@linkapp)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal @linkapp.name, json_response['data']['attributes']['name']
  end

  test 'should create linkapp' do
    assert_difference('Linkapp.count') do
      post api_v1_linkapps_url, params: { linkapp: {
        name: 'new_app',
        hyperlink: 'www.new_app.com',
        description: 'this is a new app'
      } }, as: :json
    end
    assert_response :created
  end

  test 'should not create linkapp without hyperlink' do
    assert_no_difference('Linkapp.count') do
      post api_v1_linkapps_url, params: { linkapp: {
        name: 'new_app'
      } }, as: :json
    end
    assert_response :unprocessable_entity
  end

  test 'should not create linkapp with blank hyperlink' do
    assert_no_difference('Linkapp.count') do
      post api_v1_linkapps_url, params: { linkapp: {
        name: 'new_app',
        hyperlink: ''
      } }, as: :json
    end
    assert_response :unprocessable_entity
  end

  test 'should update linkapp' do
    patch api_v1_linkapp_url(@linkapp), params: { linkapp: {
      name: 'EditedApp'
    } }, as: :json
    assert_response :success
  end

  test 'should destroy linkapp' do
    assert_difference('Linkapp.count', -1) do
      delete api_v1_linkapp_url(@linkapp), as: :json
    end
    assert_response :no_content
  end
end
