from typing import Any, Dict, Optional
from flask import current_app # type: ignore
from google.cloud import aiplatform
from app.services.bigquery_service import BigQueryService

class GoogleAIService:
    def __init__(self):
        aiplatform.init(
            project=current_app.config['GCP_PROJECT_ID'],
            location=current_app.config['GCP_LOCATION']
        )
        self.bigquery = BigQueryService()
        
    def generate_text(self, user_id: str, prompt: str, model: str = "text-bison@001", 
                     parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        try:
            # First create the request record in BigQuery
            request = self.bigquery.create_ai_request(
                AIRequestCreate( # type: ignore
                    user_id=user_id,
                    prompt=prompt,
                    model=model,
                    parameters=parameters
                )
            )
            
            # Prepare parameters
            if parameters is None:
                parameters = {
                    "temperature": 0.2,
                    "maxOutputTokens": 256,
                    "topP": 0.8,
                    "topK": 40
                }
            
            # Call Google AI Platform
            endpoint = aiplatform.Endpoint(
                endpoint_name=f"projects/{current_app.config['GCP_PROJECT_ID']}/locations/{current_app.config['GCP_LOCATION']}/publishers/google/models/{model}"
            )
            
            response = endpoint.predict(
                instances=[{"prompt": prompt}],
                parameters=parameters
            )
            
            # Update the request with response
            self.bigquery.update_ai_request(
                request_id=request.request_id,
                response=response.predictions[0]['content']
            )
            
            return {
                "success": True,
                "request_id": request.request_id,
                "response": response.predictions[0]['content']
            }
        except Exception as e:
            app.logger.error(f"Error in Google AI Service: {str(e)}") # type: ignore
            
            # Update request status to failed
            if 'request' in locals():
                self.bigquery.update_ai_request(
                    request_id=request.request_id,
                    response=str(e),
                    status="failed"
                )
            
            return {
                "success": False,
                "error": str(e)
            }