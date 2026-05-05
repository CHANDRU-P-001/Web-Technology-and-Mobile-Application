# ══════════════════════════════════════════════════════
# ADD THIS TO YOUR EXISTING Flask app.py
# ══════════════════════════════════════════════════════
# 
# STEP 1: Install anthropic
#   pip install anthropic
#
# STEP 2: Set environment variable
#   Linux/Mac:  export ANTHROPIC_API_KEY="sk-ant-..."
#   Windows:    set ANTHROPIC_API_KEY=sk-ant-...
#   OR in code: os.environ['ANTHROPIC_API_KEY'] = 'sk-ant-...'
#
# STEP 3: Add these lines to your app.py
# ══════════════════════════════════════════════════════

import os
import anthropic
from flask import request, jsonify, session

# ── ADD THIS ROUTE to your app.py ──
@app.route('/api/chat', methods=['POST'])
def chat_proxy():
    try:
        data = request.get_json()
        msg = data.get('message', '').strip()
        tool_list = data.get('tool_list', '')
        
        if not msg:
            return jsonify({'error': 'No message'}), 400
        
        api_key = os.environ.get('ANTHROPIC_API_KEY', '')
        if not api_key:
            return jsonify({'error': 'API key not configured'}), 500
        
        client = anthropic.Anthropic(api_key=api_key)
        
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",  # Fast & cheap for chat
            max_tokens=700,
            system=f"""You are NEXUS, the AI guide for AI Tools Hub. Recommend tools from this hub.

AVAILABLE TOOLS IN THIS HUB:
{tool_list}

RULES:
1. Always end your reply with: OPEN_TOOLS:[ToolName1,ToolName2]
2. Short, helpful answers with emojis.
3. Only recommend tools from the list above.
4. If no specific tools match, include the most relevant ones.""",
            messages=[{"role": "user", "content": msg}]
        )
        
        reply = response.content[0].text
        return jsonify({'reply': reply})
        
    except anthropic.AuthenticationError:
        return jsonify({'error': 'Invalid API key'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ── ALSO UPDATE your dashboard route to pass username ──
# @app.route('/dashboard')
# def dashboard():
#     username = session.get('username', 'Explorer')
#     return render_template('dashboard.html', username=username)
#
# And in dashboard.html, change this line:
#   const USERNAME = urlP.get('user') || storedUser || 'Explorer';
# To:
#   const USERNAME = '{{ username }}' || urlP.get('user') || 'Explorer';

