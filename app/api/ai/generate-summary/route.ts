import { NextRequest, NextResponse } from 'next/server';
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Initialize Bedrock Client (Relies on AWS Credentials in env or ~/.aws/credentials)
const client = new BedrockRuntimeClient({ region: "us-east-1" });

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { datasetName, objectives, metrics, issues } = body;

        // Construct a focused prompt
        const prompt = `
      You are the Chief Strategy Officer (CSO) of ${datasetName}. 
      Analyze the following strategic performance data and provide a concise, actionable executive summary.
      
      CONTEXT:
      - Strategic Objectives: ${JSON.stringify(objectives)}
      - Key Metrics: ${JSON.stringify(metrics)}
      - Critical Issues: ${JSON.stringify(issues)}

      TASK:
      Provide a strategic analysis in HTML format (no markdown code blocks, just raw HTML).
      Use a professional, executive tone.
      
      STRUCTURE:
      1. <h3 class="text-lg font-bold text-blue-900 mb-2">Strategic Outlook</h3>
         A 2-sentence summary of the overall health.
      2. <h3 class="text-lg font-bold text-blue-900 mt-4 mb-2">Root Cause Analysis</h3>
         Identify WHY the critical issues are happening (infer from the data).
      3. <h3 class="text-lg font-bold text-blue-900 mt-4 mb-2">Executive Recommendations</h3>
         3 bullet points of specific actions to take.
      
      OUTPUT (HTML ONLY):
    `;

        const input = {
            modelId: "anthropic.claude-3-sonnet-20240229-v1:0", // Or "anthropic.claude-v2" depending on access
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify({
                anthropic_version: "bedrock-2023-05-31",
                max_tokens: 1000,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: prompt
                            }
                        ]
                    }
                ]
            }),
        };

        const command = new InvokeModelCommand(input);
        const response = await client.send(command);

        // Parse the response
        const responseBody = new TextDecoder().decode(response.body);
        const result = JSON.parse(responseBody);
        const content = result.content[0].text;

        return NextResponse.json({ summary: content });

    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate AI summary. Ensure AWS credentials are configured and Model Access is granted." },
            { status: 500 }
        );
    }
}
